import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
export default authRouter;
