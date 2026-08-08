export type TripStatus = "PLANNING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type Trip = {
  id: string;
  title: string;
  description: string | null;
  status: TripStatus;
  startDate: string;
  endDate: string;
  currency: string;
  budgetLimit: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListTripsResponse = {
  data: {
    trips: Trip[];
  };
};

export type CreateTripRequest = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  currency: string;
  budgetLimit?: string;
};

export type CreateTripResponse = {
  data: {
    trip: Trip;
  };
};
