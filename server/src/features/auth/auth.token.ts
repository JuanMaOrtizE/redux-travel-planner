import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";

export const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export function createAuthToken(userId: string): string {
  return jwt.sign({}, JWT_SECRET, {
    subject: userId,
    expiresIn: AUTH_TOKEN_TTL_SECONDS,
  });
}

export function verifyAuthToken(token: string): string {
  const payload = jwt.verify(token, JWT_SECRET);

  if (typeof payload === "string" || typeof payload.sub !== "string") {
    throw new Error("Token sin usuario válido");
  }
  return payload.sub;
}
