import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "docverse-dev-secret-key-2026"
);

export async function createToken(payload: object) {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      clockTolerance: 60,
    });
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return payload as { userId: string; email: string; role: string; name: string };
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
