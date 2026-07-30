import type { RequestHandler } from "express";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import { getCurrentUser, loginUser, registerUser } from "./auth.service.js";
import { createAuthToken } from "./auth.token.js";
import { clearAuthCookie, setAuthCookie } from "./auth.cookie.js";
import { AppError } from "../../common/errors/AppError.js";

export const registerUserController: RequestHandler = async (req, res) => {
  const parsedData = registerSchema.parse(req.body);
  const registeredUser = await registerUser(parsedData);

  const token = createAuthToken(registeredUser.id);

  setAuthCookie(res, token);

  res.status(201).json({
    data: {
      user: registeredUser,
    },
  });
};

export const loginUserController: RequestHandler = async (req, res) => {
  const parsedData = loginSchema.parse(req.body);
  const loggedUser = await loginUser(parsedData);

  const token = createAuthToken(loggedUser.id);

  setAuthCookie(res, token);

  res.status(200).json({
    data: {
      user: loggedUser,
    },
  });
};

export const logoutUserController: RequestHandler = (_req, res) => {
  clearAuthCookie(res);

  res.status(204).send();
};

export const getCurrentUserController: RequestHandler = async (req, res) => {
  const auth = req.auth;

  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const user = await getCurrentUser(auth.userId);

  return res.status(200).json({
    data: { user },
  });
};
