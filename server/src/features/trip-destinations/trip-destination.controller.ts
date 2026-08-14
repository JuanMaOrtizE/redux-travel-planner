import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import { createTripDestinationSchema } from "./trip-destination.schemas.js";
import { createTripDestination } from "./trip-destination.service.js";

export const createTripDestinationController: RequestHandler = async (
  req,
  res,
) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);
  const parsedBody = createTripDestinationSchema.parse(req.body);

  const tripDestination = await createTripDestination(
    auth.userId,
    parsedParams.tripId,
    parsedBody,
  );

  return res.status(201).json({ data: { tripDestination } });
};
