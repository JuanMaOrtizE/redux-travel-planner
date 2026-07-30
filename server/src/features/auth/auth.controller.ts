import type { RequestHandler } from "express";
import { registerSchema } from "./auth.schemas.js";
import { registerUser } from "./auth.service.js";
import { createAuthToken } from "./auth.token.js";
import { setAuthCookie } from "./auth.cookie.js";

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
