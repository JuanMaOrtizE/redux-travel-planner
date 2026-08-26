import { api } from "../../services/api";
import type {
  CreateActivityRequest,
  CreateActivityResponse,
  ListActivitiesResponse,
} from "./activity.types";

export const activitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<ListActivitiesResponse, string>({
      query: (tripId) => `trips/${tripId}/activities`,
      providesTags: (_result, _error, tripId) => [
        { type: "Activities", id: tripId },
      ],
    }),
    createActivity: builder.mutation<
      CreateActivityResponse,
      CreateActivityRequest
    >({
      query: ({ tripId, body }) => {
        return { url: `trips/${tripId}/activities`, method: "POST", body };
      },
      invalidatesTags: (_result, error, { tripId }) =>
        error ? [] : [{ type: "Activities", id: tripId }],
    }),
  }),
});

export const { useGetActivitiesQuery, useCreateActivityMutation } =
  activitiesApi;
