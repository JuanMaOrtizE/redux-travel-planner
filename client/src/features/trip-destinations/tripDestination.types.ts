import type {
  Destination,
  DestinationSearchResult,
} from "../destinations/destination.types";

export type TripDestination = {
  id: string;
  tripId: string;
  position: number;
  arrivalDate: string | null;
  departureDate: string | null;
  notes: string | null;
  destination: Destination;
};

export type ListTripDestinationsResponse = {
  data: { tripDestinations: TripDestination[] };
};

export type CreateTripDestinationBody = {
  destination: DestinationSearchResult;
  arrivalDate?: string | null;
  departureDate?: string | null;
  notes?: string | null;
};

export type CreateTripDestinationRequest = {
  tripId: string;
  body: CreateTripDestinationBody;
};

export type CreateTripDestinationResponse = {
  data: { tripDestination: TripDestination };
};

export type DeleteTripDestinationRequest = {
  tripId: string;
  tripDestinationId: string;
};
