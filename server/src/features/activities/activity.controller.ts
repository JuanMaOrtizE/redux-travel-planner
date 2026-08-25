import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import {
  createActivitySchema,
  deleteActivityParamsSchema,
} from "./activity.schemas.js";
import {
  createActivity,
  deleteActivity,
  listActivities,
} from "./activity.service.js";

export const createActivityController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);
  const parsedBody = createActivitySchema.parse(req.body);

  const activity = await createActivity(
    auth.userId,
    parsedParams.tripId,
    parsedBody,
  );

  return res.status(201).json({ data: { activity } });
};

export const deleteActivityController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }
  const parsedParams = deleteActivityParamsSchema.parse(req.params);

  await deleteActivity(auth.userId, parsedParams.tripId, parsedParams.activityId);

  return res.status(204).send();
};

export const listActivitiesController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);

  const activities = await listActivities(auth.userId, parsedParams.tripId);

  return res.status(200).json({ data: { activities } });
};
