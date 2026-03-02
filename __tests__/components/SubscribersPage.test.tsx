import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubscribersPage from '@/app/admin/subscribers/page';

describe('SubscribersPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // --- Login gate ---

  it('shows login form initially', () => {
    render(<SubscribersPage />);
    expect(screen.getByText('Subscribers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter admin password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('shows error on failed login', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
    );

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  // --- After login ---

  function mockLoginAndSubscribers(contacts: unknown[] = []) {
    let callCount = 0;
    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = typeof url === 'string' ? url : (url as Request).url;
      if (urlStr.includes('/api/admin/login')) {
        callCount++;
        return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
      }
      if (urlStr.includes('/api/admin/subscribers')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({ contacts, total: contacts.length }),
            { status: 200 }
          )
        );
      }
      return Promise.resolve(new Response('{}', { status: 200 }));
    });
    return callCount;
  }

  it('shows subscriber table after successful login', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([
      {
        id: 'c1',
        email: 'alice@example.com',
        last_name: '0xabc123abc123abc123abc123abc123abc123abc1',
        created_at: '2025-01-15T00:00:00Z',
        unsubscribed: false,
      },
    ]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('1 subscribers')).toBeInTheDocument();
    expect(screen.getByText('0xabc123abc123abc123abc123abc123abc123abc1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows "No subscribers yet" when list is empty', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('No subscribers yet')).toBeInTheDocument();
    });

    expect(screen.getByText('0 subscribers')).toBeInTheDocument();
  });

  it('shows unsubscribed status in red', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([
      {
        id: 'c2',
        email: 'unsub@example.com',
        last_name: null,
        created_at: '2025-02-01T00:00:00Z',
        unsubscribed: true,
      },
    ]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('Unsubscribed')).toBeInTheDocument();
    });
  });

  it('displays em-dash for contacts without ETH address', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([
      {
        id: 'c3',
        email: 'noeth@example.com',
        last_name: null,
        created_at: '2025-01-01T00:00:00Z',
        unsubscribed: false,
      },
    ]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('\u2014')).toBeInTheDocument(); // em-dash
    });
  });

  // --- Navigation ---

  it('has Blog Editor navigation link', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      const link = screen.getByText('Blog Editor');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/admin');
    });
  });

  // --- Table headers ---

  it('displays all table column headers', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    expect(screen.getByText('ETH Address')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  // --- Bulk import UI ---

  it('shows import section with textarea and button', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('BULK IMPORT')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Import' })).toBeDisabled();
  });

  it('enables import button when textarea has content', async () => {
    const user = userEvent.setup();
    mockLoginAndSubscribers([]);

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('BULK IMPORT')).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText(/alice@example\.com/);
    await user.type(textarea, 'test@example.com');

    expect(screen.getByRole('button', { name: 'Import' })).not.toBeDisabled();
  });

  it('shows import results after successful import', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = typeof url === 'string' ? url : (url as Request).url;
      if (urlStr.includes('/api/admin/login')) {
        return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
      }
      if (urlStr.includes('/api/admin/import-subscribers')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({ success: 3, failed: 1, errors: ['Invalid email: bad'] }),
            { status: 200 }
          )
        );
      }
      if (urlStr.includes('/api/admin/subscribers')) {
        return Promise.resolve(
          new Response(JSON.stringify({ contacts: [], total: 0 }), { status: 200 })
        );
      }
      return Promise.resolve(new Response('{}', { status: 200 }));
    });

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('BULK IMPORT')).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText(/alice@example\.com/);
    await user.type(textarea, 'a@b.com\nc@d.com\ne@f.com\nbad');
    await user.click(screen.getByRole('button', { name: 'Import' }));

    await waitFor(() => {
      expect(screen.getByText('Imported: 3')).toBeInTheDocument();
    });

    expect(screen.getByText('Failed: 1')).toBeInTheDocument();
    expect(screen.getByText('Invalid email: bad')).toBeInTheDocument();
  });

  // --- Redirects to login on 401 ---

  it('redirects to login view when subscriber fetch returns 401', async () => {
    const user = userEvent.setup();

    let fetchCallCount = 0;
    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = typeof url === 'string' ? url : (url as Request).url;
      if (urlStr.includes('/api/admin/login')) {
        return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
      }
      if (urlStr.includes('/api/admin/subscribers')) {
        fetchCallCount++;
        return Promise.resolve(
          new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
        );
      }
      return Promise.resolve(new Response('{}', { status: 200 }));
    });

    render(<SubscribersPage />);

    await user.type(screen.getByPlaceholderText('Enter admin password'), 'correct');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    // Should redirect back to login since subscribers API returned 401
    await waitFor(() => {
      expect(fetchCallCount).toBeGreaterThanOrEqual(1);
      expect(screen.getByPlaceholderText('Enter admin password')).toBeInTheDocument();
    });
  });
});
