import { NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { getRpConfig, verifyChallengeCookie } from '@/lib/auth';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

export async function POST(request: Request) {
  try {
    const { registrationToken, credential: body } = await request.json();
    const expected = process.env.WEBAUTHN_REGISTRATION_TOKEN;

    if (!expected || registrationToken !== expected) {
      return NextResponse.json({ error: 'Invalid registration token' }, { status: 403 });
    }

    const challenge = await verifyChallengeCookie();
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge expired or missing' }, { status: 400 });
    }

    const { rpID, rpOrigin } = getRpConfig();

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: rpOrigin,
      expectedRPID: rpID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    const { credential } = verification.registrationInfo;

    const storedCredential = {
      credentialID: credential.id,
      credentialPublicKey: isoBase64URL.fromBuffer(credential.publicKey),
      counter: credential.counter,
      transports: body.response?.transports || [],
    };

    // Return the credential JSON for the user to store in WEBAUTHN_CREDENTIALS env var
    const credentialArray = [storedCredential];
    const base64Blob = Buffer.from(JSON.stringify(credentialArray)).toString('base64');

    return NextResponse.json({
      verified: true,
      credential: storedCredential,
      envValue: base64Blob,
      instructions: 'Copy the envValue above and set it as WEBAUTHN_CREDENTIALS in your Vercel env vars.',
    });
  } catch (error) {
    console.error('Register verify error:', error);
    return NextResponse.json(
      { error: 'Registration verification failed' },
      { status: 500 }
    );
  }
}
