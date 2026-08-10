import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { destinationSearchQuerySchema } from "./destination.schemas.js";
import { searchDestinations } from "./destination.service.js";

export const searchDestinationsController: RequestHandler = async (
  req,
  res,
) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedQuery = destinationSearchQuerySchema.parse(req.query);
  const destinations = await searchDestinations(parsedQuery);

  return res.status(200).json({
    data: {
      destinations,
    },
  });
};
