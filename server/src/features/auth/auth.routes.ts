import { Router } from "express";
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.get("/me", requireAuth, getCurrentUserController);
export default authRouter;
