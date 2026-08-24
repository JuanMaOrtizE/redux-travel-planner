import type { Activity } from "../../generated/prisma/client.js";
import type { ActivityStatus } from "../../generated/prisma/enums.js";

export type ActivityResponse = {
  id: string;
  tripId: string;
  tripDestinationId: string | null;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  locationName: string | null;
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
};

export function toActivityResponse(activity: Activity): ActivityResponse {
  return {
    id: activity.id,
    tripId: activity.tripId,
    tripDestinationId: activity.tripDestinationId,
    title: activity.title,
    description: activity.description,
    startsAt: activity.startsAt.toISOString(),
    endsAt: activity.endsAt === null ? null : activity.endsAt.toISOString(),
    locationName: activity.locationName,
    status: activity.status,
    createdAt: activity.createdAt.toISOString(),
    updatedAt: activity.updatedAt.toISOString(),
  };
}
