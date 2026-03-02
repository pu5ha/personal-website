import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock resend before importing the route
const mockCreate = vi.fn();
const mockUpdate = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      contacts: {
        create: mockCreate,
        update: mockUpdate,
      },
    };
  }),
}));

import { POST } from '@/app/api/subscribe/route';

function makeRequest(body: Record<string, unknown>) {
  return new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_AUDIENCE_ID = 'test-audience';
  });

  // --- Email validation ---

  it('rejects missing email', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/valid email/i);
  });

  it('rejects empty string email', async () => {
    const res = await POST(makeRequest({ email: '' }));
    expect(res.status).toBe(400);
  });

  it('rejects invalid email format', async () => {
    const res = await POST(makeRequest({ email: 'notanemail' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/valid email/i);
  });

  // --- Successful subscription ---

  it('subscribes with email only (no ETH address)', async () => {
    mockCreate.mockResolvedValue({ id: 'contact-1' });

    const res = await POST(makeRequest({ email: 'alice@example.com' }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    expect(mockCreate).toHaveBeenCalledWith({
      email: 'alice@example.com',
      lastName: undefined,
      audienceId: 'test-audience',
    });
  });

  it('subscribes with email and valid ETH address', async () => {
    mockCreate.mockResolvedValue({ id: 'contact-2' });
    const eth = '0x1234567890abcdef1234567890abcdef12345678';

    const res = await POST(makeRequest({ email: 'bob@example.com', ethAddress: eth }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    expect(mockCreate).toHaveBeenCalledWith({
      email: 'bob@example.com',
      lastName: eth,
      audienceId: 'test-audience',
    });
  });

  it('subscribes with an ENS name', async () => {
    mockCreate.mockResolvedValue({ id: 'contact-3' });

    const res = await POST(makeRequest({ email: 'c@d.com', ethAddress: 'vitalik.eth' }));
    expect(res.status).toBe(200);

    expect(mockCreate).toHaveBeenCalledWith({
      email: 'c@d.com',
      lastName: 'vitalik.eth',
      audienceId: 'test-audience',
    });
  });

  // --- Duplicate handling ---

  it('returns success on 409 duplicate without ETH address', async () => {
    mockCreate.mockRejectedValue({ statusCode: 409 });

    const res = await POST(makeRequest({ email: 'dupe@example.com' }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('updates contact on 409 duplicate when ETH address is provided', async () => {
    mockCreate.mockRejectedValue({ statusCode: 409 });
    mockUpdate.mockResolvedValue({});
    const eth = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';

    const res = await POST(makeRequest({ email: 'dupe@example.com', ethAddress: eth }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    expect(mockUpdate).toHaveBeenCalledWith({
      email: 'dupe@example.com',
      lastName: eth,
      audienceId: 'test-audience',
    });
  });

  // --- Error handling ---

  it('returns 500 on unexpected Resend error', async () => {
    mockCreate.mockRejectedValue(new Error('Resend is down'));

    const res = await POST(makeRequest({ email: 'fail@example.com' }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/something went wrong/i);
  });
});
