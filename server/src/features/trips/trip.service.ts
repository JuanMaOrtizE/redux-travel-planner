import prisma from "../../lib/prisma.js";
import type { CreateTripInput } from "./trip.schemas.js";
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
