import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { AUTH_COOKIE_NAME } from "./auth.cookie.js";
import { verifyAuthToken } from "./auth.token.js";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token: unknown = req.cookies?.[AUTH_COOKIE_NAME];

  if (typeof token !== "string") {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  let userId: string;

  try {
    userId = verifyAuthToken(token);
  } catch {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  req.auth = {
    userId,
  };
  next();
};
