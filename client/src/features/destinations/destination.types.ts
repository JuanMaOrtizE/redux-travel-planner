export type DestinationSearchResult = {
  providerId: string;
  name: string;
  country: string | null;
  countryCode: string | null;
  latitude: number;
  longitude: number;
  timezone: string | null;
  region: string | null;
};

export type SearchDestinationsResponse = {
  data: { destinations: DestinationSearchResult[] };
};
