import { api } from "../../services/api";
import type { ListActivitiesResponse } from "./activity.types";

export const activitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<ListActivitiesResponse, string>({
      query: (tripId) => `trips/${tripId}/activities`,
      providesTags: (_result, _error, tripId) => [
        { type: "Activities", id: tripId },
      ],
    }),
  }),
});

export const { useGetActivitiesQuery } = activitiesApi;
