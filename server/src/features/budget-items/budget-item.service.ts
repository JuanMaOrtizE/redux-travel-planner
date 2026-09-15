import { AppError } from "../../common/errors/AppError.js";
import type { TripStatus } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js";
import {
  toBudgetItemResponse,
  type BudgetItemResponse,
} from "./budget-item.mapper.js";
import type {
  CreateBudgetItemInput,
  UpdateBudgetItemInput,
} from "./budget-item.schemas.js";

async function getOwnedTripOrThrow(userId: string, tripId: string) {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!trip) {
    throw new AppError(404, "TRIP_NOT_FOUND", "Viaje no encontrado");
  }

  return trip;
}

function assertTripAllowsBudgetChanges(status: TripStatus): void {
  if (status !== "PLANNING" && status !== "CONFIRMED") {
    throw new AppError(
      409,
      "TRIP_BUDGET_LOCKED",
      "No puedes modificar el presupuesto de un viaje finalizado",
    );
  }
}

async function resolveActivityId(
  tripId: string,
  activityId: string | null | undefined,
): Promise<string | null> {
  if (activityId == null) {
    return null;
  }

  const activity = await prisma.activity.findFirst({
    where: {
      id: activityId,
      tripId,
    },
    select: {
      id: true,
    },
  });

  if (!activity) {
    throw new AppError(
      404,
      "ACTIVITY_NOT_FOUND",
      "Actividad no encontrada",
    );
  }

  return activity.id;
}

async function getBudgetItemOrThrow(tripId: string, budgetItemId: string) {
  const budgetItem = await prisma.budgetItem.findFirst({
    where: {
      id: budgetItemId,
      tripId,
    },
    select: {
      id: true,
    },
  });

  if (!budgetItem) {
    throw new AppError(
      404,
      "BUDGET_ITEM_NOT_FOUND",
      "Partida presupuestaria no encontrada",
    );
  }

  return budgetItem;
}

export async function createBudgetItem(
  userId: string,
  tripId: string,
  input: CreateBudgetItemInput,
): Promise<BudgetItemResponse> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsBudgetChanges(trip.status);

  const activityId = await resolveActivityId(trip.id, input.activityId);

  const budgetItem = await prisma.budgetItem.create({
    data: {
      tripId: trip.id,
      activityId,
      category: input.category,
      description: input.description,
      estimatedAmount: input.estimatedAmount,
      actualAmount: input.actualAmount ?? null,
    },
  });

  return toBudgetItemResponse(budgetItem);
}

export async function listBudgetItems(
  userId: string,
  tripId: string,
): Promise<BudgetItemResponse[]> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  const budgetItems = await prisma.budgetItem.findMany({
    where: {
      tripId: trip.id,
    },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  });

  return budgetItems.map(toBudgetItemResponse);
}

export async function updateBudgetItem(
  userId: string,
  tripId: string,
  budgetItemId: string,
  input: UpdateBudgetItemInput,
): Promise<BudgetItemResponse> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsBudgetChanges(trip.status);

  const existingBudgetItem = await getBudgetItemOrThrow(
    trip.id,
    budgetItemId,
  );
  const activityId =
    input.activityId === undefined
      ? undefined
      : await resolveActivityId(trip.id, input.activityId);

  const updatedBudgetItem = await prisma.budgetItem.update({
    where: {
      id: existingBudgetItem.id,
    },
    data: {
      ...(activityId !== undefined && { activityId }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.estimatedAmount !== undefined && {
        estimatedAmount: input.estimatedAmount,
      }),
      ...(input.actualAmount !== undefined && {
        actualAmount: input.actualAmount,
      }),
    },
  });

  return toBudgetItemResponse(updatedBudgetItem);
}

export async function deleteBudgetItem(
  userId: string,
  tripId: string,
  budgetItemId: string,
): Promise<void> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsBudgetChanges(trip.status);

  const deleteResult = await prisma.budgetItem.deleteMany({
    where: {
      id: budgetItemId,
      tripId: trip.id,
    },
  });

  if (deleteResult.count === 0) {
    throw new AppError(
      404,
      "BUDGET_ITEM_NOT_FOUND",
      "Partida presupuestaria no encontrada",
    );
  }
}
