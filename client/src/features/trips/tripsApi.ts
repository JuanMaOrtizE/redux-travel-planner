import { api } from "../../services/api";
import type { ListTripsResponse } from "./trip.types";

export const tripsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query<ListTripsResponse, void>({
      query: () => "trips",
    }),
  }),
});

export const { useGetTripsQuery } = tripsApi;
