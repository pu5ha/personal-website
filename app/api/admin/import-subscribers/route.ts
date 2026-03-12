import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  const isAdmin = await verifyAdminToken();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { subscribers } = await request.json();

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No subscribers provided' },
        { status: 400 }
      );
    }

    if (subscribers.length > 500) {
      return NextResponse.json(
        { error: 'Maximum 500 subscribers per import' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID!;

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const sub of subscribers) {
      const { email, ethAddress } = sub;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        failed++;
        errors.push(`Invalid email: ${email}`);
        continue;
      }

      try {
        await resend.contacts.create({
          email,
          lastName: ethAddress || undefined,
          audienceId,
        });
        success++;
      } catch (createError: unknown) {
        // 409 = duplicate, treat as success
        if (
          createError &&
          typeof createError === 'object' &&
          'statusCode' in createError &&
          (createError as { statusCode: number }).statusCode === 409
        ) {
          success++;
        } else {
          failed++;
          errors.push(`Failed to import: ${email}`);
        }
      }
    }

    return NextResponse.json({ success, failed, errors });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to process import' },
      { status: 500 }
    );
  }
}
