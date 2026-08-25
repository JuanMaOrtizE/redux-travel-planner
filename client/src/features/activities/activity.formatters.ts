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
