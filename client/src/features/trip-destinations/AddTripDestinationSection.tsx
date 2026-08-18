import { useState } from "react";
import { useCreateTripDestinationMutation } from "./tripDestinationsApi";
import type { DestinationSearchResult } from "../destinations/destination.types";
import DestinationSearch from "../destinations/DestinationSearch";

type AddTripDestinationSectionProps = {
  tripId: string;
};

function getCreateTripDestinationErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "status" in error) {
    switch (error.status) {
      case 400:
        return "El destino seleccionado no contiene datos válidos.";
      case 401:
        return "Tu sesión venció. Recarga la página e inicia sesión nuevamente.";
      case 404:
        return "No encontramos el viaje solicitado.";
      case 409:
        return "Este viaje está finalizado y sus paradas ya no se pueden modificar.";
      case "FETCH_ERROR":
        return "No pudimos conectar con el servidor. Comprueba tu conexión e intenta nuevamente.";
    }
  }

  return "No pudimos agregar el destino al viaje. Intenta nuevamente.";
}

export default function AddTripDestinationSection({
  tripId,
}: AddTripDestinationSectionProps) {
  const [
    createTripDestination,
    { data, isLoading, isError, isSuccess, error, reset },
  ] = useCreateTripDestinationMutation();

  const [selectingProviderId, setSelectingProviderId] = useState<string | null>(
    null,
  );

  async function handleCreateTripDestination(
    destination: DestinationSearchResult,
  ) {
    if (isLoading) return;

    reset();
    setSelectingProviderId(destination.providerId);
    try {
      await createTripDestination({
        tripId,
        body: {
          destination,
        },
      }).unwrap();
    } catch {
      // RTK Query conserva el error de la mutation para mostrarlo en la interfaz.
    } finally {
      setSelectingProviderId(null);
    }
  }

  return (
    <section
      aria-labelledby="add-trip-destination-title"
      className="mt-10 border-t border-slate-200 pt-8"
    >
      <h2
        id="add-trip-destination-title"
        className="text-xl font-semibold tracking-tight text-slate-900"
      >
        Agregar una parada
      </h2>
      <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
        Busca un destino y selecciónalo para añadirlo al final del recorrido.
      </p>
      {isError ? (
        <p
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {getCreateTripDestinationErrorMessage(error)}
        </p>
      ) : null}

      {isSuccess && data ? (
        <p
          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {data.data.tripDestination.destination.name} se agregó al viaje.
        </p>
      ) : null}

      <DestinationSearch
        onSelectDestination={(destination) => {
          void handleCreateTripDestination(destination);
        }}
        isSelectingDestination={isLoading}
        selectingProviderId={selectingProviderId}
      />
    </section>
  );
}
