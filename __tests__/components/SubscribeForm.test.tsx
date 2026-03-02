import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubscribeForm from '@/app/components/SubscribeForm';

describe('SubscribeForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // --- Rendering ---

  it('renders email input, ETH input, and subscribe button', () => {
    render(<SubscribeForm />);

    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('chaskin.eth (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('renders the SUBSCRIBE heading', () => {
    render(<SubscribeForm />);
    expect(screen.getByText('SUBSCRIBE')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<SubscribeForm />);
    expect(screen.getByText('Get new posts delivered to your inbox.')).toBeInTheDocument();
  });

  // --- Successful submission ---

  it('submits with email only and shows success', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    render(<SubscribeForm />);

    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(screen.getByText(/You're subscribed/)).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith('/api/subscribe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'alice@example.com', ethAddress: undefined }),
    });
  });

  it('submits with both email and ENS name', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

    render(<SubscribeForm />);

    await user.type(screen.getByPlaceholderText('your@email.com'), 'bob@example.com');
    await user.type(screen.getByPlaceholderText('chaskin.eth (optional)'), 'bob.eth');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(screen.getByText(/You're subscribed/)).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith('/api/subscribe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bob@example.com', ethAddress: 'bob.eth' }),
    });
  });

  // --- Error handling ---

  it('shows API error message on non-ok response', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Server exploded' }), { status: 500 })
    );

    render(<SubscribeForm />);

    await user.type(screen.getByPlaceholderText('your@email.com'), 'fail@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(screen.getByText('Server exploded')).toBeInTheDocument();
    });
  });

  it('shows generic error on network failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    render(<SubscribeForm />);

    await user.type(screen.getByPlaceholderText('your@email.com'), 'fail@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });
  });

  // --- Loading state ---

  it('shows "Subscribing..." and disables inputs during submission', async () => {
    const user = userEvent.setup();
    let resolveResponse: (value: Response) => void;
    vi.spyOn(globalThis, 'fetch').mockReturnValue(
      new Promise((resolve) => {
        resolveResponse = resolve;
      })
    );

    render(<SubscribeForm />);

    await user.type(screen.getByPlaceholderText('your@email.com'), 'wait@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(screen.getByRole('button', { name: 'Subscribing...' })).toBeDisabled();
    expect(screen.getByPlaceholderText('your@email.com')).toBeDisabled();
    expect(screen.getByPlaceholderText('chaskin.eth (optional)')).toBeDisabled();

    // Resolve to clean up
    resolveResponse!(new Response(JSON.stringify({ success: true }), { status: 200 }));
    await waitFor(() => {
      expect(screen.getByText(/You're subscribed/)).toBeInTheDocument();
    });
  });
});
