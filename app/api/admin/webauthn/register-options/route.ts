import { NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getStoredCredentials, getRpConfig, generateChallengeCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { registrationToken } = await request.json();
    const expected = process.env.WEBAUTHN_REGISTRATION_TOKEN;

    if (!expected || registrationToken !== expected) {
      return NextResponse.json({ error: 'Invalid registration token' }, { status: 403 });
    }

    const credentials = getStoredCredentials();
    const { rpID } = getRpConfig();

    const options = await generateRegistrationOptions({
      rpName: 'Chaskin Admin',
      rpID,
      userName: 'admin',
      userDisplayName: 'Admin',
      attestationType: 'none',
      excludeCredentials: credentials.map((cred) => ({
        id: cred.credentialID,
        transports: cred.transports,
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    await generateChallengeCookie(options.challenge);

    return NextResponse.json(options);
  } catch (error) {
    console.error('Register options error:', error);
    return NextResponse.json(
      { error: 'Failed to generate registration options' },
      { status: 500 }
    );
  }
}
