import type { TripStatus } from "../../generated/prisma/enums.js";
import type { Trip } from "../../generated/prisma/client.js";

export type TripResponse = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  status: TripStatus;
  currency: string;
  budgetLimit: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toTripResponse(trip: Trip): TripResponse {
  const publicTrip = {
    id: trip.id,
    title: trip.title,
    description: trip.description,
    startDate: trip.startDate.toISOString().slice(0, 10),
    endDate: trip.endDate.toISOString().slice(0, 10),
    status: trip.status,
    currency: trip.currency,
    budgetLimit: trip.budgetLimit === null ? null : trip.budgetLimit.toFixed(2),
    createdAt: trip.createdAt.toISOString(),
    updatedAt: trip.updatedAt.toISOString(),
  };

  return publicTrip;
}
