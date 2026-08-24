import type { Marker as LeafletMarker } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { TripDestination } from "./tripDestination.types";
import {
  getDateLabel,
  getDestinationContext,
} from "./tripDestination.formatters";

type MapPosition = [number, number];

type TripDestinationsMapProps = {
  selectedTripDestinationId: string | null;
  tripDestinations: TripDestination[];
};

type MapViewportControllerProps = {
  selectedTripDestinationId: string | null;
  tripDestinations: TripDestination[];
};

type TripDestinationMarkerProps = {
  isSelected: boolean;
  tripDestination: TripDestination;
};

function TripDestinationMarker({
  isSelected,
  tripDestination,
}: TripDestinationMarkerProps) {
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    const marker = markerRef.current;

    if (!marker) {
      return;
    }

    if (isSelected) {
      marker.openPopup();
      return;
    }

    marker.closePopup();
  }, [isSelected]);

  const markerPosition: MapPosition = [
    tripDestination.destination.latitude,
    tripDestination.destination.longitude,
  ];
  const destinationContext = getDestinationContext(tripDestination);

  return (
    <Marker
      alt={`Parada ${tripDestination.position}: ${tripDestination.destination.name}`}
      position={markerPosition}
      ref={markerRef}
      title={tripDestination.destination.name}
    >
      <Popup>
        <p className="text-xs font-medium text-teal-700">
          Parada {tripDestination.position}
        </p>
        <p className="mt-1 font-semibold text-slate-900">
          {tripDestination.destination.name}
        </p>
        {destinationContext ? (
          <p className="mt-1 text-sm text-slate-600">{destinationContext}</p>
        ) : null}
        <p className="mt-2 text-sm font-medium text-slate-700">
          {getDateLabel(tripDestination)}
        </p>
      </Popup>
    </Marker>
  );
}

function MapViewportController({
  selectedTripDestinationId,
  tripDestinations,
}: MapViewportControllerProps) {
  const map = useMap();

  useEffect(() => {
    const positions: MapPosition[] = tripDestinations.map((tripDestination) => [
      tripDestination.destination.latitude,
      tripDestination.destination.longitude,
    ]);

    const selectedTripDestination = tripDestinations.find(
      (tripDestination) => tripDestination.id === selectedTripDestinationId,
    );

    if (selectedTripDestination) {
      const selectedPosition: MapPosition = [
        selectedTripDestination.destination.latitude,
        selectedTripDestination.destination.longitude,
      ];

      map.setView(selectedPosition, 12, { animate: false });
      return;
    }

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
  }, [map, tripDestinations, selectedTripDestinationId]);

  return null;
}

export default function TripDestinationsMap({
  selectedTripDestinationId,
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

        {tripDestinations.map((tripDestination) => (
          <TripDestinationMarker
            isSelected={
              tripDestination.id === selectedTripDestinationId
            }
            key={tripDestination.id}
            tripDestination={tripDestination}
          />
        ))}
        <MapViewportController
          selectedTripDestinationId={selectedTripDestinationId}
          tripDestinations={tripDestinations}
        />
      </MapContainer>
    </div>
  );
}
