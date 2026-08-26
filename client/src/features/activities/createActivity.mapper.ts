import { fromZonedTime } from "date-fns-tz";
import type { CreateActivityBody } from "./activity.types";
import type { CreateActivityFormValues } from "./createActivity.schema";

export function mapCreateActivityFormToBody(
  values: CreateActivityFormValues,
  timeZone: string,
): CreateActivityBody {
  const body: CreateActivityBody = {
    title: values.title,
    startsAt: fromZonedTime(values.startsAt, timeZone).toISOString(),
  };

  if (values.tripDestinationId) {
    body.tripDestinationId = values.tripDestinationId;
  }

  if (values.description) {
    body.description = values.description;
  }

  if (values.locationName) {
    body.locationName = values.locationName;
  }

  if (values.endsAt) {
    body.endsAt = fromZonedTime(values.endsAt, timeZone).toISOString();
  }

  return body;
}
