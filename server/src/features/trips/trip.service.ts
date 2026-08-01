import prisma from "../../lib/prisma.js";
import type { CreateTripInput, UpdateTripInput } from "./trip.schemas.js";
import { toTripResponse, type TripResponse } from "./trip.mapper.js";
import { AppError } from "../../common/errors/AppError.js";

function toUtcDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export async function createTrip(
  userId: string,
  input: CreateTripInput,
): Promise<TripResponse> {
  const trip = await prisma.trip.create({
    data: {
      title: input.title,
      description: input.description ?? null,
      startDate: toUtcDate(input.startDate),
      endDate: toUtcDate(input.endDate),
      currency: input.currency,
      budgetLimit: input.budgetLimit ?? null,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return toTripResponse(trip);
}

export async function listTrips(userId: string): Promise<TripResponse[]> {
  const trips = await prisma.trip.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return trips.map(toTripResponse);
}

export async function getTripById(
  userId: string,
  tripId: string,
): Promise<TripResponse> {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
  });

  if (!trip) {
    throw new AppError(404, "TRIP_NOT_FOUND", "Viaje no encontrado");
  }

  return toTripResponse(trip);
}

export async function updateTrip(
  userId: string,
  tripId: string,
  input: UpdateTripInput,
): Promise<TripResponse> {
  const existingTrip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
  });

  if (!existingTrip) {
    throw new AppError(404, "TRIP_NOT_FOUND", "Viaje no encontrado");
  }

  const nextStartDate =
    input.startDate !== undefined
      ? toUtcDate(input.startDate)
      : existingTrip.startDate;

  const nextEndDate =
    input.endDate !== undefined
      ? toUtcDate(input.endDate)
      : existingTrip.endDate;

  if (nextStartDate > nextEndDate) {
    throw new AppError(
      400,
      "INVALID_TRIP_DATE_RANGE",
      "La fecha final no puede ser anterior a la inicial",
    );
  }

  // Si input.campo es undefined, no se envió y no requiere actualización; el spread no agrega esa propiedad a data.
  const updatedTrip = await prisma.trip.update({
    where: {
      id: existingTrip.id,
    },
    data: {
      ...(input.title !== undefined && {
        title: input.title,
      }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.startDate !== undefined && {
        startDate: nextStartDate,
      }),
      ...(input.endDate !== undefined && {
        endDate: nextEndDate,
      }),
      ...(input.status !== undefined && {
        status: input.status,
      }),
      ...(input.currency !== undefined && {
        currency: input.currency,
      }),
      ...(input.budgetLimit !== undefined && {
        budgetLimit: input.budgetLimit,
      }),
    },
  });

  return toTripResponse(updatedTrip);
}
