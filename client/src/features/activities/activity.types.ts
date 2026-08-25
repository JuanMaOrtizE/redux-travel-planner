export type ActivityStatus =
  | "PLANNED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type Activity = {
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

export type ListActivitiesResponse = {
  data: { activities: Activity[] };
};

export type CreateActivityBody = {
  tripDestinationId?: string | null;
  title: string;
  description?: string | null;
  startsAt: string;
  endsAt?: string | null;
  locationName?: string | null;
};

export type CreateActivityRequest = {
  tripId: string;
  body: CreateActivityBody;
};

export type CreateActivityResponse = {
  data: { activity: Activity };
};

export type DeleteActivityRequest = {
  tripId: string;
  activityId: string;
};
