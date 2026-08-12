import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import { searchDestinationsController } from "./destination.controller.js";

const destinationRouter = Router();

destinationRouter.get("/search", requireAuth, searchDestinationsController);

export default destinationRouter;
