import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import {
  createTripController,
  listTripsController,
} from "./trip.controller.js";

const tripRouter = Router();

tripRouter.post("/", requireAuth, createTripController);
tripRouter.get("/", requireAuth, listTripsController);

export default tripRouter;
