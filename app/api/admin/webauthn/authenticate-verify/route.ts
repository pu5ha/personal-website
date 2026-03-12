import { NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { getStoredCredentials, getRpConfig, verifyChallengeCookie, issueAdminToken } from '@/lib/auth';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const challenge = await verifyChallengeCookie();

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge expired or missing' }, { status: 400 });
    }

    const credentials = getStoredCredentials();
    const { rpID, rpOrigin } = getRpConfig();

    const credential = credentials.find((c) => c.credentialID === body.id);
    if (!credential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: rpOrigin,
      expectedRPID: rpID,
      credential: {
        id: credential.credentialID,
        publicKey: isoBase64URL.toBuffer(credential.credentialPublicKey),
        counter: credential.counter,
        transports: credential.transports,
      },
    });

    if (!verification.verified) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 401 });
    }

    await issueAdminToken();

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json(
      { error: 'Authentication verification failed' },
      { status: 500 }
    );
  }
}
