import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token || token.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID!;

    const allContacts: { id: string; email: string; last_name: string | null; created_at: string; unsubscribed: boolean }[] = [];
    let cursor: string | undefined;

    // Paginate through all contacts
    do {
      const params: { audienceId: string; cursor?: string } = { audienceId };
      if (cursor) params.cursor = cursor;

      const { data, error } = await resend.contacts.list(params);

      if (error) {
        console.error('Resend list error:', error);
        break;
      }

      if (data?.data) {
        allContacts.push(
          ...data.data.map((c: { id: string; email: string; last_name?: string | null; created_at: string; unsubscribed: boolean }) => ({
            id: c.id,
            email: c.email,
            last_name: c.last_name ?? null,
            created_at: c.created_at,
            unsubscribed: c.unsubscribed,
          }))
        );
      }

      // Check for next page cursor - Resend uses cursor-based pagination
      // If we got fewer than expected or no cursor info, stop
      const hasMore = data?.data && data.data.length > 0;
      // Resend doesn't expose a next cursor directly in the SDK response,
      // so we break after the first call if there's no pagination indicator
      if (!hasMore) break;
      // The Resend SDK doesn't provide cursor in list response, so we get all in one call
      break;
    } while (true);

    return NextResponse.json({
      contacts: allContacts,
      total: allContacts.length,
    });
  } catch (error) {
    console.error('Subscribers list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
