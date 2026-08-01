import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import {
  createTripSchema,
  tripParamsSchema,
  updateTripSchema,
} from "./trip.schemas.js";
import {
  createTrip,
  deleteTrip,
  getTripById,
  listTrips,
  updateTrip,
} from "./trip.service.js";

export const createTripController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedData = createTripSchema.parse(req.body);

  const trip = await createTrip(auth.userId, parsedData);

  return res.status(201).json({ data: { trip } });
};

export const listTripsController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const trips = await listTrips(auth.userId);

  return res.status(200).json({
    data: {
      trips,
    },
  });
};

export const getTripByIdController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedData = tripParamsSchema.parse(req.params);
  const { tripId } = parsedData;

  const trip = await getTripById(auth.userId, tripId);

  return res.status(200).json({ data: { trip } });
};

export const updateTripController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedTripIdData = tripParamsSchema.parse(req.params);
  const parsedBodyData = updateTripSchema.parse(req.body);

  const { tripId } = parsedTripIdData;

  const trip = await updateTrip(auth.userId, tripId, parsedBodyData);

  return res.status(200).json({ data: { trip } });
};

export const deleteTripController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedTripIdData = tripParamsSchema.parse(req.params);

  const { tripId } = parsedTripIdData;

  await deleteTrip(auth.userId, tripId);

  return res.status(204).send();
};
