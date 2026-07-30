import type { RequestHandler } from "express";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import { loginUser, registerUser } from "./auth.service.js";
import { createAuthToken } from "./auth.token.js";
import { clearAuthCookie, setAuthCookie } from "./auth.cookie.js";

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
