import { formatInTimeZone } from "date-fns-tz";
import type { ActivityStatus } from "./activity.types";

const activityStatusLabels: Record<ActivityStatus, string> = {
  PLANNED: "Planeada",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
};

export function getActivityStatusLabel(status: ActivityStatus): string {
  return activityStatusLabels[status];
}

export function formatActivityDateTime(
  value: string,
  timeZone: string,
): string {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  });

  return formatter.format(new Date(value));
}

export function getActivityDayKey(
  value: string,
  timeZone: string,
): string {
  return formatInTimeZone(new Date(value), timeZone, "yyyy-MM-dd");
}

export function formatActivityDayLabel(dayKey: string): string {
  const dayAtUtcMidnight = new Date(`${dayKey}T00:00:00.000Z`);

  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(dayAtUtcMidnight);
}
