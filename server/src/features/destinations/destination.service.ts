import {
  searchDestinationsWithOpenMeteo,
  type DestinationSearchResult,
} from "./destination.geocoding.js";
import type { DestinationSearchQuery } from "./destination.schemas.js";

export async function searchDestinations(
  query: DestinationSearchQuery,
): Promise<DestinationSearchResult[]> {
  return searchDestinationsWithOpenMeteo(query.q);
}
