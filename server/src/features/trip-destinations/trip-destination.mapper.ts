import type { Prisma } from "../../generated/prisma/client.js";

type TripDestinationWithDestination =
  Prisma.TripDestinationGetPayload<{
    include: {
      destination: true;
    };
  }>;

export type TripDestinationResponse = {
  id: string;
  tripId: string;
  position: number;
  arrivalDate: string | null;
  departureDate: string | null;
  notes: string | null;
  destination: {
    id: string;
    providerId: string;
    name: string;
    country: string | null;
    countryCode: string | null;
    region: string | null;
    latitude: number;
    longitude: number;
    timezone: string | null;
  };
};

export function toTripDestinationResponse(
  tripDestination: TripDestinationWithDestination,
): TripDestinationResponse {
  return {
    id: tripDestination.id,
    tripId: tripDestination.tripId,
    position: tripDestination.position,
    arrivalDate:
      tripDestination.arrivalDate === null
        ? null
        : tripDestination.arrivalDate.toISOString().slice(0, 10),
    departureDate:
      tripDestination.departureDate === null
        ? null
        : tripDestination.departureDate.toISOString().slice(0, 10),
    notes: tripDestination.notes,
    destination: {
      id: tripDestination.destination.id,
      providerId: tripDestination.destination.providerId,
      name: tripDestination.destination.name,
      country: tripDestination.destination.country,
      countryCode: tripDestination.destination.countryCode,
      region: tripDestination.destination.region,
      latitude: tripDestination.destination.latitude,
      longitude: tripDestination.destination.longitude,
      timezone: tripDestination.destination.timezone,
    },
  };
}
