import { api } from "../../services/api";
import type {
  CreateTripDestinationRequest,
  CreateTripDestinationResponse,
  DeleteTripDestinationRequest,
  ListTripDestinationsResponse,
} from "./tripDestination.types";

export const tripDestinationsApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTripDestinations: builder.query<ListTripDestinationsResponse, string>({
        query: (tripId) => {
          return { url: `trips/${tripId}/destinations` };
        },
        providesTags: (_result, _error, tripId) => [
          { type: "TripDestinations", id: tripId },
        ],
      }),

      createTripDestination: builder.mutation<
        CreateTripDestinationResponse,
        CreateTripDestinationRequest
      >({
        query: ({ tripId, body }) => {
          return { url: `trips/${tripId}/destinations`, method: "POST", body };
        },
        invalidatesTags: (_result, error, { tripId }) =>
          error ? [] : [{ type: "TripDestinations", id: tripId }],
      }),

      deleteTripDestination: builder.mutation<
        void,
        DeleteTripDestinationRequest
      >({
        query: ({ tripId, tripDestinationId }) => {
          return {
            url: `trips/${tripId}/destinations/${tripDestinationId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (_result, error, { tripId }) =>
          error
            ? []
            : [
                { type: "TripDestinations", id: tripId },
                { type: "Activities", id: tripId },
              ],
      }),
    };
  },
});

export const {
  useGetTripDestinationsQuery,
  useCreateTripDestinationMutation,
  useDeleteTripDestinationMutation,
} = tripDestinationsApi;
