import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import { createActivitySchema } from "./activity.schemas.js";
import { createActivity } from "./activity.service.js";

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
