import type { TripStatus } from "./trip.types";

export const tripStatusBadgeClassNames: Record<TripStatus, string> = {
  PLANNING: "bg-amber-100 text-amber-900",
  CONFIRMED: "bg-sky-100 text-sky-900",
  COMPLETED: "bg-emerald-100 text-emerald-900",
  CANCELLED: "bg-red-100 text-red-900",
};

export const tripStatusTopBorderClassNames: Record<TripStatus, string> = {
  PLANNING: "border-dashed border-t-amber-500",
  CONFIRMED: "border-dashed border-t-sky-500",
  COMPLETED: "border-dashed border-t-emerald-500",
  CANCELLED: "border-dashed border-t-red-500",
};
