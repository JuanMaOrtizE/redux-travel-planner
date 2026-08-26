import { api } from "../../services/api";

import type { SearchDestinationsResponse } from "./destination.types";

export const destinationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchDestinations: builder.query<SearchDestinationsResponse, string>({
      query: (searchTerm) => {
        return { url: "destinations/search", params: { q: searchTerm } };
      },
    }),
  }),
});

export const { useSearchDestinationsQuery } = destinationsApi;
