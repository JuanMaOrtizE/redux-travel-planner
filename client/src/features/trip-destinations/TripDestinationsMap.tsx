import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { TripDestination } from "./tripDestination.types";

type TripDestinationsMapProps = {
  tripDestinations: TripDestination[];
};

type MapViewportControllerProps = {
  tripDestinations: TripDestination[];
};

function MapViewportController({
  tripDestinations,
}: MapViewportControllerProps) {
  const map = useMap();

  useEffect(() => {
    const firstTripDestination = tripDestinations[0];

    if (!firstTripDestination) {
      return;
    }

    const position: [number, number] = [
      firstTripDestination.destination.latitude,
      firstTripDestination.destination.longitude,
    ];

    map.setView(position, map.getZoom(), {
      animate: false,
    });
  }, [map, tripDestinations]);

  return null;
}

export default function TripDestinationsMap({
  tripDestinations,
}: TripDestinationsMapProps) {
  const positions: [number, number][] = tripDestinations.map(
    (tripDestination) => [
      tripDestination.destination.latitude,
      tripDestination.destination.longitude,
    ],
  );

  const firstPosition = positions[0];

  if (!firstPosition) {
    return null;
  }

  const initialCenter = firstPosition;

  return (
    <div
      aria-label="Mapa de las paradas del viaje"
      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
      role="region"
    >
      <MapContainer
        center={initialCenter}
        zoom={4}
        scrollWheelZoom={false}
        className="h-72 w-full sm:h-80"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapViewportController tripDestinations={tripDestinations} />
      </MapContainer>
    </div>
  );
}
