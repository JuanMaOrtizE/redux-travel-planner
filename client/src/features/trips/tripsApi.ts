import { api } from "../../services/api";
import type {
  CreateTripRequest,
  CreateTripResponse,
  GetTripResponse,
  ListTripsResponse,
} from "./trip.types";

export const tripsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query<ListTripsResponse, void>({
      query: () => "trips",
      providesTags: ["Auth", "Trips"],
    }),
    getTrip: builder.query<GetTripResponse, string>({
      query: (tripId) => `trips/${tripId}`,
      providesTags: ["Auth", "Trips"],
    }),
    createTrip: builder.mutation<CreateTripResponse, CreateTripRequest>({
      query: (tripData) => {
        return { url: "trips", method: "POST", body: tripData };
      },
      invalidatesTags: (result) => (result ? ["Trips"] : []),
    }),
  }),
});

export const { useGetTripsQuery, useGetTripQuery, useCreateTripMutation } =
  tripsApi;
