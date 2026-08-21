import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { TripDestination } from "./tripDestination.types";

type MapPosition = [number, number];

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
    const positions: MapPosition[] = tripDestinations.map((tripDestination) => [
      tripDestination.destination.latitude,
      tripDestination.destination.longitude,
    ]);

    const firstPosition = positions[0];

    if (!firstPosition) {
      return;
    }

    if (positions.length === 1) {
      map.setView(firstPosition, 8, {
        animate: false,
      });

      return;
    }

    map.fitBounds(positions, {
      padding: [32, 32],
      maxZoom: 10,
      animate: false,
    });
  }, [map, tripDestinations]);

  return null;
}

export default function TripDestinationsMap({
  tripDestinations,
}: TripDestinationsMapProps) {
  const positions: MapPosition[] = tripDestinations.map((tripDestination) => [
    tripDestination.destination.latitude,
    tripDestination.destination.longitude,
  ]);

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
        zoom={6}
        scrollWheelZoom={false}
        className="h-72 w-full sm:h-80"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {tripDestinations.map((tripDestination) => {
          const markerPosition: MapPosition = [
            tripDestination.destination.latitude,
            tripDestination.destination.longitude,
          ];

          return <Marker key={tripDestination.id} position={markerPosition} />;
        })}
        <MapViewportController tripDestinations={tripDestinations} />
      </MapContainer>
    </div>
  );
}
