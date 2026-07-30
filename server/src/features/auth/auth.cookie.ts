import type { CookieOptions, Response } from "express";
import { NODE_ENV } from "../../config/env.js";
import { AUTH_TOKEN_TTL_SECONDS } from "./auth.token.js";

export const AUTH_COOKIE_NAME = "travel_planner_token";

const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function setAuthCookie(res: Response, token: string): Response {
  return res.cookie(AUTH_COOKIE_NAME, token, {
    ...authCookieOptions,
    maxAge: AUTH_TOKEN_TTL_SECONDS * 1000,
  });
}

export function clearAuthCookie(res: Response): Response {
  return res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions);
}
