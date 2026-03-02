import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock resend
const mockList = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      contacts: {
        list: mockList,
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

import { GET } from '@/app/api/admin/subscribers/route';

describe('GET /api/admin/subscribers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_AUDIENCE_ID = 'test-audience';
  });

  // --- Auth ---

  it('returns 401 when no admin_token cookie', async () => {
    mockCookieGet.mockReturnValue(undefined);

    const res = await GET();
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('returns 401 when admin_token cookie has wrong value', async () => {
    mockCookieGet.mockReturnValue({ value: 'wrong' });

    const res = await GET();
    expect(res.status).toBe(401);
  });

  // --- Success cases ---

  it('returns contacts list when authenticated', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockList.mockResolvedValue({
      data: {
        data: [
          {
            id: 'c1',
            email: 'alice@example.com',
            last_name: '0xabc123abc123abc123abc123abc123abc123abc1',
            created_at: '2025-01-15T00:00:00Z',
            unsubscribed: false,
          },
          {
            id: 'c2',
            email: 'bob@example.com',
            last_name: null,
            created_at: '2025-02-01T00:00:00Z',
            unsubscribed: true,
          },
        ],
      },
      error: null,
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.total).toBe(2);
    expect(data.contacts).toHaveLength(2);
    expect(data.contacts[0].email).toBe('alice@example.com');
    expect(data.contacts[0].last_name).toBe('0xabc123abc123abc123abc123abc123abc123abc1');
    expect(data.contacts[1].unsubscribed).toBe(true);
    expect(data.contacts[1].last_name).toBeNull();
  });

  it('returns empty list when no contacts', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockList.mockResolvedValue({
      data: { data: [] },
      error: null,
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.total).toBe(0);
    expect(data.contacts).toEqual([]);
  });

  it('returns empty list on Resend list error', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockList.mockResolvedValue({
      data: null,
      error: { message: 'something broke' },
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.total).toBe(0);
    expect(data.contacts).toEqual([]);
  });

  it('returns 500 on unexpected exception', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockList.mockRejectedValue(new Error('network error'));

    const res = await GET();
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/failed to fetch/i);
  });

  it('maps contacts correctly when last_name is undefined', async () => {
    mockCookieGet.mockReturnValue({ value: 'authenticated' });
    mockList.mockResolvedValue({
      data: {
        data: [
          {
            id: 'c3',
            email: 'noeth@example.com',
            // last_name not present at all
            created_at: '2025-03-01T00:00:00Z',
            unsubscribed: false,
          },
        ],
      },
      error: null,
    });

    const res = await GET();
    const data = await res.json();
    expect(data.contacts[0].last_name).toBeNull();
  });
});
