import { AppError } from "../../common/errors/AppError.js";
import type { TripStatus } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js";
import {
  toBudgetItemResponse,
  type BudgetItemResponse,
} from "./budget-item.mapper.js";
import type { CreateBudgetItemInput } from "./budget-item.schemas.js";

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
