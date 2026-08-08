import type { TripStatus } from "./trip.types";

const tripStatusLabels: Record<TripStatus, string> = {
  PLANNING: "En planificación",
  CONFIRMED: "Confirmado",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export function getTripStatusLabel(status: TripStatus) {
  return tripStatusLabels[status];
}
