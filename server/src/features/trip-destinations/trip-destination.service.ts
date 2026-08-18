import prisma from "../../lib/prisma.js";
import { AppError } from "../../common/errors/AppError.js";
import type { Prisma } from "../../generated/prisma/client.js";
import type { TripStatus } from "../../generated/prisma/enums.js";
import type { DestinationCandidateInput } from "../destinations/destination.schemas.js";
import type { CreateTripDestinationInput } from "./trip-destination.schemas.js";
import {
  toTripDestinationResponse,
  type TripDestinationResponse,
} from "./trip-destination.mapper.js";
import { toNullableUtcDate } from "../../common/dates/date.utils.js";

async function getOwnedTripOrThrow(userId: string, tripId: string) {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
    select: {
      id: true,
      status: true,
      startDate: true,
      endDate: true,
    },
  });

  if (!trip) {
    throw new AppError(404, "TRIP_NOT_FOUND", "Viaje no encontrado");
  }

  return trip;
}

function assertTripAllowsDestinationChanges(status: TripStatus): void {
  if (status !== "PLANNING" && status !== "CONFIRMED") {
    throw new AppError(
      409,
      "TRIP_DESTINATIONS_LOCKED",
      "No puedes modificar las paradas de un viaje finalizado",
    );
  }
}

function assertTripDestinationDatesWithinTrip(
  trip: {
    startDate: Date;
    endDate: Date;
  },
  arrivalDate: Date | null,
  departureDate: Date | null,
): void {
  const isArrivalOutside =
    arrivalDate !== null &&
    (arrivalDate < trip.startDate || arrivalDate > trip.endDate);

  const isDepartureOutside =
    departureDate !== null &&
    (departureDate < trip.startDate || departureDate > trip.endDate);

  if (isArrivalOutside || isDepartureOutside) {
    throw new AppError(
      400,
      "TRIP_DESTINATION_DATES_OUT_OF_RANGE",
      "Las fechas de la parada deben estar dentro del rango del viaje",
    );
  }
}

async function getOrCreateDestination(
  tx: Prisma.TransactionClient,
  candidate: DestinationCandidateInput,
) {
  return tx.destination.upsert({
    where: {
      providerId: candidate.providerId,
    },
    update: {},
    create: {
      providerId: candidate.providerId,
      name: candidate.name,
      country: candidate.country,
      countryCode: candidate.countryCode,
      latitude: candidate.latitude,
      longitude: candidate.longitude,
      timezone: candidate.timezone,
      region: candidate.region,
    },
  });
}

async function getNextPosition(
  tx: Prisma.TransactionClient,
  tripId: string,
): Promise<number> {
  const positions = await tx.tripDestination.aggregate({
    where: { tripId },
    _max: { position: true },
  });

  return (positions._max.position ?? 0) + 1;
}

export async function createTripDestination(
  userId: string,
  tripId: string,
  input: CreateTripDestinationInput,
): Promise<TripDestinationResponse> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsDestinationChanges(trip.status);

  const arrivalDate = toNullableUtcDate(input.arrivalDate);
  const departureDate = toNullableUtcDate(input.departureDate);

  assertTripDestinationDatesWithinTrip(trip, arrivalDate, departureDate);

  const tripDestination = await prisma.$transaction(async (tx) => {
    const destination = await getOrCreateDestination(tx, input.destination);
    const position = await getNextPosition(tx, trip.id);

    return tx.tripDestination.create({
      data: {
        tripId: trip.id,
        destinationId: destination.id,
        position,
        arrivalDate,
        departureDate,
        notes: input.notes ?? null,
      },
      include: { destination: true },
    });
  });

  return toTripDestinationResponse(tripDestination);
}

export async function listTripDestinations(
  userId: string,
  tripId: string,
): Promise<TripDestinationResponse[]> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  const tripDestinations = await prisma.tripDestination.findMany({
    where: { tripId: trip.id },
    orderBy: { position: "asc" },
    include: { destination: true },
  });

  return tripDestinations.map(toTripDestinationResponse);
}
export async function deleteTripDestination(
  userId: string,
  tripId: string,
  tripDestinationId: string,
): Promise<void> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsDestinationChanges(trip.status);

  await prisma.$transaction(async (tx) => {
    const tripDestination = await getTripDestinationOrThrow(
      tx,
      trip.id,
      tripDestinationId,
    );

    await tx.tripDestination.delete({
      where: { id: tripDestination.id },
    });

    await compactTripDestinationPositions(
      tx,
      trip.id,
      tripDestination.position,
    );
  });
}

async function getTripDestinationOrThrow(
  tx: Prisma.TransactionClient,
  tripId: string,
  tripDestinationId: string,
) {
  const tripDestination = await tx.tripDestination.findFirst({
    where: {
      id: tripDestinationId,
      tripId,
    },
    select: {
      id: true,
      position: true,
    },
  });

  if (!tripDestination) {
    throw new AppError(
      404,
      "TRIP_DESTINATION_NOT_FOUND",
      "Parada no encontrada",
    );
  }

  return tripDestination;
}

async function compactTripDestinationPositions(
  tx: Prisma.TransactionClient,
  tripId: string,
  deletedPosition: number,
) {
  const tripDestinations = await tx.tripDestination.findMany({
    where: {
      tripId,
      position: { gt: deletedPosition },
    },
    orderBy: { position: "asc" },
    select: {
      id: true,
      position: true,
    },
  });

  for (const tripDestination of tripDestinations) {
    await tx.tripDestination.update({
      where: { id: tripDestination.id },
      data: { position: tripDestination.position - 1 },
    });
  }
}
