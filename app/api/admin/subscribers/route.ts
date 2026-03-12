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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allContacts: any[] = [];
    let after: string | undefined;
    let pages = 0;

    // Paginate through all contacts using limit/after pagination
    do {
      pages++;
      const listParams: Record<string, unknown> = { limit: 100 };
      if (after) listParams.after = after;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await resend.contacts.list(listParams as any);

      if (error) {
        console.error('Resend list error:', JSON.stringify(error));
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((data as any).has_more && data.data.length > 0) {
          after = data.data[data.data.length - 1].id;
        } else {
          break;
        }
      } else {
        break;
      }

      // Safety limit to prevent function timeouts
      if (pages >= 20) break;
    } while (true);

    return NextResponse.json({
      contacts: allContacts,
      total: allContacts.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Subscribers list error:', message);
    return NextResponse.json(
      { error: `Failed to fetch subscribers: ${message}` },
      { status: 500 }
    );
  }
}
