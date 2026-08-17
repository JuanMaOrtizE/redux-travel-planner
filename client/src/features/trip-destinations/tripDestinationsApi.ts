import { api } from "../../services/api";
import type { ListTripDestinationsResponse } from "./tripDestination.types";

export const tripDestinationsApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTripDestinations: builder.query<ListTripDestinationsResponse, string>({
        query: (tripId) => {
          return { url: `trips/${tripId}/destinations` };
        },
      }),
    };
  },
});

export const { useGetTripDestinationsQuery } = tripDestinationsApi;
