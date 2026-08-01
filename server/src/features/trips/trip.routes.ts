import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import {
  createTripController,
  deleteTripController,
  getTripByIdController,
  listTripsController,
  updateTripController,
} from "./trip.controller.js";

const tripRouter = Router();

tripRouter.post("/", requireAuth, createTripController);
tripRouter.get("/", requireAuth, listTripsController);
tripRouter.get("/:tripId", requireAuth, getTripByIdController);
tripRouter.patch("/:tripId", requireAuth, updateTripController);
tripRouter.delete("/:tripId", requireAuth, deleteTripController);

export default tripRouter;
