import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email, ethAddress } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID!;

    try {
      await resend.contacts.create({
        email,
        lastName: ethAddress || undefined,
        audienceId,
      });
    } catch (createError: unknown) {
      // Resend returns a 409 for duplicate contacts
      if (
        createError &&
        typeof createError === 'object' &&
        'statusCode' in createError &&
        (createError as { statusCode: number }).statusCode === 409
      ) {
        // If ETH address provided, update the existing contact
        if (ethAddress) {
          await resend.contacts.update({
            email,
            lastName: ethAddress,
            audienceId,
          });
        }
        return NextResponse.json({ success: true });
      }
      throw createError;
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
