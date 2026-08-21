import { useEffect, useState } from "react";
import {
  getDateLabel,
  getDestinationContext,
} from "./tripDestination.formatters";
import { useGetTripDestinationsQuery } from "./tripDestinationsApi";
import DeleteTripDestinationAction from "./DeleteTripDestinationAction";
import TripDestinationsMap from "./TripDestinationsMap";

type TripDestinationsSectionProps = {
  canEditTripDestinations: boolean;
  tripId: string;
};

function getTripDestinationsErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "status" in error) {
    switch (error.status) {
      case 401:
        return "Tu sesión venció. Recarga la página e inicia sesión nuevamente.";
      case 404:
        return "No encontramos el viaje solicitado.";
      case "FETCH_ERROR":
        return "No pudimos conectar con el servidor. Comprueba tu conexión e intenta nuevamente.";
    }
  }

  return "No pudimos cargar las paradas del viaje. Intenta nuevamente.";
}

export default function TripDestinationsSection({
  canEditTripDestinations,
  tripId,
}: TripDestinationsSectionProps) {
  const {
    currentData: tripDestinationsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetTripDestinationsQuery(tripId);

  const tripDestinations =
    tripDestinationsResponse?.data.tripDestinations ?? [];

  const hasCurrentResponse = tripDestinationsResponse !== undefined;

  const showLoadingState =
    isLoading || (isFetching && tripDestinationsResponse === undefined);

  const showInitialError = isError && !hasCurrentResponse && !isFetching;

  const showRefreshingState = isFetching && hasCurrentResponse;

  const showRefreshError = isError && hasCurrentResponse && !isFetching;

  const [confirmingTripDestinationId, setConfirmingTripDestinationId] =
    useState<string | null>(null);

  const [selectedTripDestinationId, setSelectedTripDestinationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedTripDestinationId(null);
  }, [tripDestinations.length]);

  const hasActiveTripDestinationConfirmation = tripDestinations.some(
    (tripDestination) => tripDestination.id === confirmingTripDestinationId,
  );

  return (
    <section
      aria-busy={isFetching}
      aria-labelledby="trip-destinations-title"
      className="mt-10 border-t border-slate-200 pt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="trip-destinations-title"
          >
            Paradas
          </h2>
          <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
            Destinos organizados según el orden de visita del viaje.
          </p>
        </div>

        {hasCurrentResponse && tripDestinations.length > 0 ? (
          <p className="text-sm font-medium text-slate-600">
            {tripDestinations.length}{" "}
            {tripDestinations.length === 1 ? "parada" : "paradas"}
          </p>
        ) : null}
      </div>

      {showLoadingState ? (
        <div className="mt-5" role="status">
          <span className="sr-only">Cargando paradas del viaje...</span>
          <div
            aria-hidden="true"
            className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white animate-pulse motion-reduce:animate-none"
          >
            {[0, 1, 2].map((item) => (
              <div className="flex gap-4 p-5" key={item}>
                <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
                <div className="min-w-0 flex-1">
                  <div className="h-5 w-40 max-w-full rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-56 max-w-full rounded bg-slate-100" />
                  <div className="mt-3 h-4 w-48 max-w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {showInitialError ? (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5"
          role="alert"
        >
          <p className="font-semibold text-red-950">
            No pudimos cargar las paradas
          </p>
          <p className="mt-2 text-sm leading-6 text-red-900">
            {getTripDestinationsErrorMessage(error)}
          </p>
          <button
            className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isFetching}
            onClick={() => void refetch()}
            type="button"
          >
            {isFetching ? "Reintentando..." : "Intentar de nuevo"}
          </button>
        </div>
      ) : null}

      {showRefreshingState ? (
        <p className="mt-4 text-sm text-slate-600" role="status">
          Actualizando paradas...
        </p>
      ) : null}

      {showRefreshError ? (
        <div
          className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-amber-950"
          role="status"
        >
          <p className="text-sm leading-6">
            {getTripDestinationsErrorMessage(error)} Mostramos la última lista
            disponible.
          </p>
          <button
            className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isFetching}
            onClick={() => void refetch()}
            type="button"
          >
            Reintentar actualización
          </button>
        </div>
      ) : null}

      {hasCurrentResponse && tripDestinations.length === 0 ? (
        <div
          className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-6"
          role="status"
        >
          <p className="font-semibold text-slate-900">
            Este viaje todavía no tiene paradas
          </p>
          <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
            Cuando agregues un destino, aparecerá aquí según su orden de visita.
          </p>
        </div>
      ) : null}

      {hasCurrentResponse && tripDestinations.length > 0 ? (
        <div className="mt-5 space-y-4">
          <TripDestinationsMap
            selectedTripDestinationId={selectedTripDestinationId}
            tripDestinations={tripDestinations}
          />
          <ol className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {tripDestinations.map((tripDestination) => {
              const destinationContext = getDestinationContext(tripDestination);
              const isSelected =
                selectedTripDestinationId === tripDestination.id;

              return (
                <li
                  className={`relative flex min-h-32 min-w-0 items-start gap-4 p-5 transition-colors motion-reduce:transition-none ${isSelected ? "bg-teal-50" : "bg-white"}`}
                  key={tripDestination.id}
                >
                  <button
                    aria-pressed={isSelected}
                    className="flex min-w-0 flex-1 cursor-pointer items-start gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-teal-700"
                    onClick={() =>
                      setSelectedTripDestinationId(tripDestination.id)
                    }
                    type="button"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-800">
                      <span className="sr-only">Parada </span>
                      {tripDestination.position}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block wrap-break-words font-semibold text-slate-900">
                        {tripDestination.destination.name}
                      </span>

                      {destinationContext ? (
                        <span className="mt-1 block wrap-break-words text-sm text-slate-600">
                          {destinationContext}
                        </span>
                      ) : null}

                      <span className="mt-3 block text-sm font-medium text-slate-700">
                        {getDateLabel(tripDestination)}
                      </span>

                      {tripDestination.notes ? (
                        <span className="mt-2 block wrap-break-words text-sm leading-6 text-slate-600">
                          {tripDestination.notes}
                        </span>
                      ) : null}
                    </span>
                  </button>

                  {canEditTripDestinations ? (
                    <DeleteTripDestinationAction
                      destinationName={tripDestination.destination.name}
                      tripDestinationId={tripDestination.id}
                      tripId={tripId}
                      isConfirming={
                        confirmingTripDestinationId === tripDestination.id
                      }
                      onOpenConfirmation={() =>
                        setConfirmingTripDestinationId(tripDestination.id)
                      }
                      onCloseConfirmation={() =>
                        setConfirmingTripDestinationId(null)
                      }
                      isDisabled={
                        hasActiveTripDestinationConfirmation &&
                        confirmingTripDestinationId !== tripDestination.id
                      }
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
