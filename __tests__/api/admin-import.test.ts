import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock resend
const mockCreate = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      contacts: {
        create: mockCreate,
      },
    };
  }),
}));

// Mock next/headers cookies
const mockCookieGet = vi.fn();
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    get: (...args: unknown[]) => mockCookieGet(...args),
  }),
}));

import { POST } from '@/app/api/admin/import-subscribers/route';

function makeRequest(body: Record<string, unknown>) {
  return new Request('http://localhost/api/admin/import-subscribers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/admin/import-subscribers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_AUDIENCE_ID = 'test-audience';
  });

  // --- Auth ---

  it('returns 401 without auth cookie', async () => {
    mockCookieGet.mockReturnValue(undefined);

    const res = await POST(makeRequest({ subscribers: [{ email: 'a@b.com' }] }));
    expect(res.status).toBe(401);
  });

  it('returns 401 with invalid auth cookie', async () => {
    mockCookieGet.mockReturnValue({ value: 'nope' });

    const res = await POST(makeRequest({ subscribers: [{ email: 'a@b.com' }] }));
    expect(res.status).toBe(401);
  });

  // --- Validation ---

  it('returns 400 for empty subscribers array', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });

    const res = await POST(makeRequest({ subscribers: [] }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/no subscribers/i);
  });

  it('returns 400 for non-array subscribers', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });

    const res = await POST(makeRequest({ subscribers: 'not-an-array' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when exceeding 500 subscriber limit', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });

    const subs = Array.from({ length: 501 }, (_, i) => ({ email: `user${i}@test.com` }));
    const res = await POST(makeRequest({ subscribers: subs }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/500/);
  });

  // --- Import logic ---

  it('imports valid subscribers successfully', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockCreate.mockResolvedValue({ id: 'new' });

    const res = await POST(
      makeRequest({
        subscribers: [
          { email: 'alice@example.com' },
          { email: 'bob@example.com' },
        ],
      })
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(2);
    expect(data.failed).toBe(0);
    expect(data.errors).toEqual([]);
    expect(mockCreate).toHaveBeenCalledTimes(2);
  });

  it('passes ETH address as lastName', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockCreate.mockResolvedValue({ id: 'new' });
    const eth = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';

    await POST(
      makeRequest({
        subscribers: [{ email: 'eth@example.com', ethAddress: eth }],
      })
    );

    expect(mockCreate).toHaveBeenCalledWith({
      email: 'eth@example.com',
      lastName: eth,
      audienceId: 'test-audience',
    });
  });

  it('counts 409 duplicates as success', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockCreate.mockRejectedValue({ statusCode: 409 });

    const res = await POST(
      makeRequest({
        subscribers: [
          { email: 'dupe1@example.com' },
          { email: 'dupe2@example.com' },
        ],
      })
    );

    const data = await res.json();
    expect(data.success).toBe(2);
    expect(data.failed).toBe(0);
  });

  it('reports invalid emails as failures', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });

    const res = await POST(
      makeRequest({
        subscribers: [
          { email: '' },
          { email: 'notanemail' },
        ],
      })
    );

    const data = await res.json();
    expect(data.success).toBe(0);
    expect(data.failed).toBe(2);
    expect(data.errors).toHaveLength(2);
    expect(data.errors[0]).toMatch(/Invalid email/);
  });

  it('handles mix of success, duplicate, invalid, and failure', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });

    let callCount = 0;
    mockCreate.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.resolve({ id: 'ok' });
      if (callCount === 2) return Promise.reject({ statusCode: 409 });
      return Promise.reject(new Error('server error'));
    });

    const res = await POST(
      makeRequest({
        subscribers: [
          { email: 'good@example.com' },          // success
          { email: 'dupe@example.com' },           // 409 -> success
          { email: 'fail@example.com' },           // error -> failed
          { email: 'bad-email' },                  // invalid -> failed (skipped, no API call)
        ],
      })
    );

    const data = await res.json();
    expect(data.success).toBe(2);  // good + dupe
    expect(data.failed).toBe(2);   // fail + bad-email
    expect(data.errors).toHaveLength(2);
    expect(mockCreate).toHaveBeenCalledTimes(3); // bad-email never hits API
  });

  it('accepts exactly 500 subscribers', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockCreate.mockResolvedValue({ id: 'ok' });

    const subs = Array.from({ length: 500 }, (_, i) => ({ email: `user${i}@test.com` }));
    const res = await POST(makeRequest({ subscribers: subs }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(500);
  });
});
