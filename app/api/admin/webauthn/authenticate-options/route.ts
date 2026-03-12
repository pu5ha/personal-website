import { NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { getStoredCredentials, getRpConfig, generateChallengeCookie } from '@/lib/auth';

export async function GET() {
  try {
    const credentials = getStoredCredentials();
    const { rpID } = getRpConfig();

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: credentials.map((cred) => ({
        id: cred.credentialID,
        transports: cred.transports,
      })),
      userVerification: 'preferred',
    });

    await generateChallengeCookie(options.challenge);

    return NextResponse.json(options);
  } catch (error) {
    console.error('Auth options error:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication options' },
      { status: 500 }
    );
  }
}
