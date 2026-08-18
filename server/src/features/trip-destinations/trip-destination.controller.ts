import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import {
  createTripDestinationSchema,
  deleteTripDestinationParamsSchema,
} from "./trip-destination.schemas.js";
import {
  createTripDestination,
  deleteTripDestination,
  listTripDestinations,
} from "./trip-destination.service.js";

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

export const listTripDestinationsController: RequestHandler = async (
  req,
  res,
) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);
  const tripDestinations = await listTripDestinations(
    auth.userId,
    parsedParams.tripId,
  );

  return res.status(200).json({ data: { tripDestinations } });
};

export const deleteTripDestinationController: RequestHandler = async (
  req,
  res,
) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = deleteTripDestinationParamsSchema.parse(req.params);

  await deleteTripDestination(
    auth.userId,
    parsedParams.tripId,
    parsedParams.tripDestinationId,
  );

  return res.status(204).send();
};
