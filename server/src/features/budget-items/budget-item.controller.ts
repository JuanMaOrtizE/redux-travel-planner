import type { RequestHandler } from "express";
import { AppError } from "../../common/errors/AppError.js";
import { tripParamsSchema } from "../trips/trip.schemas.js";
import {
  budgetItemParamsSchema,
  createBudgetItemSchema,
  updateBudgetItemSchema,
} from "./budget-item.schemas.js";
import {
  createBudgetItem,
  deleteBudgetItem,
  listBudgetItems,
  updateBudgetItem,
} from "./budget-item.service.js";

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

export const listBudgetItemsController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = tripParamsSchema.parse(req.params);
  const budgetItems = await listBudgetItems(
    auth.userId,
    parsedParams.tripId,
  );

  return res.status(200).json({ data: { budgetItems } });
};

export const updateBudgetItemController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = budgetItemParamsSchema.parse(req.params);
  const parsedBody = updateBudgetItemSchema.parse(req.body);

  const budgetItem = await updateBudgetItem(
    auth.userId,
    parsedParams.tripId,
    parsedParams.budgetItemId,
    parsedBody,
  );

  return res.status(200).json({ data: { budgetItem } });
};

export const deleteBudgetItemController: RequestHandler = async (req, res) => {
  const auth = req.auth;
  if (!auth) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }

  const parsedParams = budgetItemParamsSchema.parse(req.params);

  await deleteBudgetItem(
    auth.userId,
    parsedParams.tripId,
    parsedParams.budgetItemId,
  );

  return res.status(204).send();
};
