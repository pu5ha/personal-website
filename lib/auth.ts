import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface StoredCredential {
  credentialID: string;
  credentialPublicKey: string; // base64url
  counter: number;
  transports?: AuthenticatorTransport[];
}

function getJwtSecret() {
  const secret = process.env.WEBAUTHN_JWT_SECRET;
  if (!secret) throw new Error('WEBAUTHN_JWT_SECRET not configured');
  return new TextEncoder().encode(secret);
}

export function getStoredCredentials(): StoredCredential[] {
  const raw = process.env.WEBAUTHN_CREDENTIALS;
  if (!raw) return [];
  try {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
  } catch {
    return [];
  }
}

export function getRpConfig() {
  const rpID = process.env.WEBAUTHN_RP_ID;
  const rpOrigin = process.env.WEBAUTHN_RP_ORIGIN;
  if (!rpID || !rpOrigin) throw new Error('WEBAUTHN_RP_ID and WEBAUTHN_RP_ORIGIN must be set');
  return { rpID, rpOrigin };
}

export async function generateChallengeCookie(challenge: string) {
  const token = await new SignJWT({ challenge })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('60s')
    .sign(getJwtSecret());

  const cookieStore = await cookies();
  cookieStore.set('webauthn_challenge', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60,
    path: '/',
  });
}

export async function verifyChallengeCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('webauthn_challenge');
  if (!token) return null;

  // Clear the challenge cookie (one-time use)
  cookieStore.set('webauthn_challenge', '', { maxAge: 0, path: '/' });

  try {
    const { payload } = await jwtVerify(token.value, getJwtSecret());
    return (payload.challenge as string) || null;
  } catch {
    return null;
  }
}

export async function issueAdminToken() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecret());

  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token.value, getJwtSecret());
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
