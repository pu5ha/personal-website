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
    let after: string | undefined;

    // Paginate through all contacts using limit/after pagination
    do {
      const params: { audienceId: string; limit?: number; after?: string } = { audienceId, limit: 100 };
      if (after) params.after = after;

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

        // Use the last contact's ID as the cursor for the next page
        if (data.has_more && data.data.length > 0) {
          after = data.data[data.data.length - 1].id;
        } else {
          break;
        }
      } else {
        break;
      }
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
