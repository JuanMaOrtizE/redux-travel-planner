import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import { createBudgetItemSchema } from "./budget-item.schemas.js";
import { createBudgetItem } from "./budget-item.service.js";

export const createBudgetItemController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);
  const parsedBody = createBudgetItemSchema.parse(req.body);

  const budgetItem = await createBudgetItem(
    auth.userId,
    parsedParams.tripId,
    parsedBody,
  );

  return res.status(201).json({ data: { budgetItem } });
};
