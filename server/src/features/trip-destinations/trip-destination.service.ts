import prisma from "../../lib/prisma.js";
import { AppError } from "../../common/errors/AppError.js";

async function getOwnedTripOrThrow(userId: string, tripId: string) {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });

  if (!trip) {
    throw new AppError(404, "TRIP_NOT_FOUND", "Viaje no encontrado");
  }

  return trip;
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
