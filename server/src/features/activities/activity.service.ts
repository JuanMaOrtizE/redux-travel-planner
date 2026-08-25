import { AppError } from "../../common/errors/AppError.js";
import { toDateKeyInTimeZone } from "../../common/dates/date.utils.js";
import type { TripStatus } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js";
import {
  toActivityResponse,
  type ActivityResponse,
} from "./activity.mapper.js";
import type { CreateActivityInput } from "./activity.schemas.js";

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

function assertTripAllowsActivityChanges(status: TripStatus): void {
  if (status !== "PLANNING" && status !== "CONFIRMED") {
    throw new AppError(
      409,
      "TRIP_ACTIVITIES_LOCKED",
      "No puedes modificar las actividades de un viaje finalizado",
    );
  }
}

async function resolveActivityTimeZone(
  tripId: string,
  tripDestinationId: string | null | undefined,
): Promise<string> {
  if (tripDestinationId == null) {
    return "UTC";
  }

  const tripDestination = await prisma.tripDestination.findFirst({
    where: {
      id: tripDestinationId,
      tripId,
    },
    select: {
      destination: {
        select: {
          timezone: true,
        },
      },
    },
  });

  if (!tripDestination) {
    throw new AppError(
      404,
      "TRIP_DESTINATION_NOT_FOUND",
      "Parada no encontrada",
    );
  }

  return tripDestination.destination.timezone ?? "UTC";
}

function assertActivityDatesWithinTrip(
  trip: {
    startDate: Date;
    endDate: Date;
  },
  startsAt: Date,
  endsAt: Date | null,
  timeZone: string,
): void {
  const tripStartDateKey = trip.startDate.toISOString().slice(0, 10);
  const tripEndDateKey = trip.endDate.toISOString().slice(0, 10);
  const activityStartDateKey = toDateKeyInTimeZone(startsAt, timeZone);
  const activityEndDateKey =
    endsAt === null ? null : toDateKeyInTimeZone(endsAt, timeZone);

  const isStartOutside =
    activityStartDateKey < tripStartDateKey ||
    activityStartDateKey > tripEndDateKey;

  const isEndOutside =
    activityEndDateKey !== null &&
    (activityEndDateKey < tripStartDateKey ||
      activityEndDateKey > tripEndDateKey);

  if (isStartOutside || isEndOutside) {
    throw new AppError(
      400,
      "ACTIVITY_DATES_OUT_OF_TRIP_RANGE",
      "Las fechas de la actividad deben estar dentro del rango del viaje",
    );
  }
}

export async function createActivity(
  userId: string,
  tripId: string,
  input: CreateActivityInput,
): Promise<ActivityResponse> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsActivityChanges(trip.status);

  const timeZone = await resolveActivityTimeZone(
    trip.id,
    input.tripDestinationId,
  );
  const startsAt = new Date(input.startsAt);
  const endsAt = input.endsAt == null ? null : new Date(input.endsAt);

  assertActivityDatesWithinTrip(trip, startsAt, endsAt, timeZone);

  const activity = await prisma.activity.create({
    data: {
      tripId: trip.id,
      tripDestinationId: input.tripDestinationId ?? null,
      title: input.title,
      description: input.description ?? null,
      startsAt,
      endsAt,
      locationName: input.locationName ?? null,
    },
  });

  return toActivityResponse(activity);
}

export async function deleteActivity(
  userId: string,
  tripId: string,
  activityId: string,
): Promise<void> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  assertTripAllowsActivityChanges(trip.status);

  const deleteResult = await prisma.activity.deleteMany({
    where: { id: activityId, tripId: trip.id },
  });

  if (deleteResult.count === 0) {
    throw new AppError(404, "ACTIVITY_NOT_FOUND", "Actividad no encontrada");
  }
}

export async function listActivities(
  userId: string,
  tripId: string,
): Promise<ActivityResponse[]> {
  const trip = await getOwnedTripOrThrow(userId, tripId);

  const activities = await prisma.activity.findMany({
    where: {
      tripId: trip.id,
    },
    orderBy: [{ startsAt: "asc" }, { createdAt: "asc" }],
  });

  return activities.map(toActivityResponse);
}
