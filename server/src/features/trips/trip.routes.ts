import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import {
  createTripController,
  getTripByIdController,
  listTripsController,
} from "./trip.controller.js";

const tripRouter = Router();

tripRouter.post("/", requireAuth, createTripController);
tripRouter.get("/", requireAuth, listTripsController);
tripRouter.get("/:tripId", requireAuth, getTripByIdController);

export default tripRouter;
