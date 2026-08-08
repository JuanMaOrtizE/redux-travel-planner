import type { CreateTripFormValues } from "./createTrip.schema";
import type { CreateTripRequest } from "./trip.types";

export function mapCreateTripFormToRequest(
  values: CreateTripFormValues,
): CreateTripRequest {
  const request: CreateTripRequest = {
    title: values.title,
    startDate: values.startDate,
    endDate: values.endDate,
    currency: values.currency,
  };

  if (values.description) {
    request.description = values.description;
  }

  if (values.budgetLimit) {
    request.budgetLimit = values.budgetLimit;
  }

  return request;
}
