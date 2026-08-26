import { useEffect, useState } from "react";
import ActivityGroupList from "../activities/ActivityGroupList";
import type { Activity } from "../activities/activity.types";
import { useGetActivitiesQuery } from "../activities/activitiesApi";
import TripDestinationsMap from "../trip-destinations/TripDestinationsMap";
import type { TripDestination } from "../trip-destinations/tripDestination.types";
import { useGetTripDestinationsQuery } from "../trip-destinations/tripDestinationsApi";
import ItineraryStopRow from "./ItineraryStopRow";

const EMPTY_TRIP_DESTINATIONS: TripDestination[] = [];

type TripItinerarySectionProps = {
  canEditTripDestinations: boolean;
  tripId: string;
};

type GroupedActivities = {
  activitiesByTripDestinationId: Map<string, Activity[]>;
  generalActivities: Activity[];
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

function getActivitiesErrorMessage(error: unknown): string {
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

  return "No pudimos cargar las actividades del viaje. Intenta nuevamente.";
}

function groupActivities(activities: Activity[]): GroupedActivities {
  const activitiesByTripDestinationId = new Map<string, Activity[]>();
  const generalActivities: Activity[] = [];

  for (const activity of activities) {
    if (activity.tripDestinationId === null) {
      generalActivities.push(activity);
      continue;
    }

    const destinationActivities =
      activitiesByTripDestinationId.get(activity.tripDestinationId) ?? [];

    destinationActivities.push(activity);
    activitiesByTripDestinationId.set(
      activity.tripDestinationId,
      destinationActivities,
    );
  }

  return { activitiesByTripDestinationId, generalActivities };
}

function ItinerarySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-5 animate-pulse motion-reduce:animate-none"
    >
      <div className="h-72 rounded-xl bg-slate-100 sm:h-80" />
      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[0, 1].map((item) => (
          <div className="grid lg:grid-cols-12" key={item}>
            <div className="space-y-3 p-5 lg:col-span-4 lg:p-6">
              <div className="h-5 w-40 max-w-full rounded bg-slate-200" />
              <div className="h-4 w-52 max-w-full rounded bg-slate-100" />
              <div className="h-4 w-32 max-w-full rounded bg-slate-100" />
            </div>
            <div className="space-y-3 border-t border-slate-200 p-5 lg:col-span-8 lg:border-l lg:border-t-0 lg:p-6">
              <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
              <div className="h-5 w-36 max-w-full rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ItineraryActivityGroupProps = {
  activities: Activity[];
  description: string;
  isWarning?: boolean;
  timeZone: string | null;
  title: string;
};

function ItineraryActivityGroup({
  activities,
  description,
  isWarning = false,
  timeZone,
  title,
}: ItineraryActivityGroupProps) {
  return (
    <section
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
      className="mt-6 grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-12"
    >
      <div
        className={`p-4 sm:p-5 lg:col-span-4 lg:p-6 ${isWarning ? "bg-amber-50 text-amber-950" : "bg-slate-50"}`}
      >
        <h3
          className="font-semibold"
          id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm leading-6 ${isWarning ? "text-amber-900" : "text-slate-600"}`}
        >
          {description}
        </p>
      </div>

      <div className="min-w-0 border-t border-slate-200 p-4 sm:p-5 lg:col-span-8 lg:border-l lg:border-t-0 lg:p-6">
        <ActivityGroupList
          activities={activities}
          emptyMessage="No hay actividades en este grupo."
          label={title}
          timeZone={timeZone}
        />
      </div>
    </section>
  );
}

export default function TripItinerarySection({
  canEditTripDestinations,
  tripId,
}: TripItinerarySectionProps) {
  const {
    currentData: tripDestinationsResponse,
    isLoading: areTripDestinationsLoading,
    isFetching: areTripDestinationsFetching,
    isError: areTripDestinationsError,
    error: tripDestinationsError,
    refetch: refetchTripDestinations,
  } = useGetTripDestinationsQuery(tripId);

  const {
    currentData: activitiesResponse,
    isLoading: areActivitiesLoading,
    isFetching: areActivitiesFetching,
    isError: areActivitiesError,
    error: activitiesError,
    refetch: refetchActivities,
  } = useGetActivitiesQuery(tripId);

  const tripDestinations =
    tripDestinationsResponse?.data.tripDestinations ?? EMPTY_TRIP_DESTINATIONS;
  const activities = activitiesResponse?.data.activities ?? [];
  const hasTripDestinationsResponse = tripDestinationsResponse !== undefined;
  const hasActivitiesResponse = activitiesResponse !== undefined;

  const showTripDestinationsLoading =
    areTripDestinationsLoading ||
    (areTripDestinationsFetching && !hasTripDestinationsResponse);
  const showTripDestinationsInitialError =
    areTripDestinationsError &&
    !hasTripDestinationsResponse &&
    !areTripDestinationsFetching;
  const showTripDestinationsRefreshing =
    areTripDestinationsFetching && hasTripDestinationsResponse;
  const showTripDestinationsRefreshError =
    areTripDestinationsError &&
    hasTripDestinationsResponse &&
    !areTripDestinationsFetching;

  const showActivitiesLoading =
    areActivitiesLoading || (areActivitiesFetching && !hasActivitiesResponse);
  const showActivitiesInitialError =
    areActivitiesError && !hasActivitiesResponse && !areActivitiesFetching;
  const showActivitiesRefreshing =
    areActivitiesFetching && hasActivitiesResponse;
  const showActivitiesRefreshError =
    areActivitiesError && hasActivitiesResponse && !areActivitiesFetching;

  const { activitiesByTripDestinationId, generalActivities } =
    groupActivities(activities);
  const knownTripDestinationIds = new Set(
    tripDestinations.map((tripDestination) => tripDestination.id),
  );
  const unmatchedActivities = activities.filter(
    (activity) =>
      activity.tripDestinationId !== null &&
      !knownTripDestinationIds.has(activity.tripDestinationId),
  );

  const activityGroupState = showActivitiesLoading
    ? "loading"
    : showActivitiesInitialError
      ? "error"
      : "ready";

  const [confirmingTripDestinationId, setConfirmingTripDestinationId] =
    useState<string | null>(null);
  const [selectedTripDestinationId, setSelectedTripDestinationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedTripDestinationId((currentId) =>
      currentId !== null &&
      !tripDestinations.some(
        (tripDestination) => tripDestination.id === currentId,
      )
        ? null
        : currentId,
    );

    setConfirmingTripDestinationId((currentId) =>
      currentId !== null &&
      !tripDestinations.some(
        (tripDestination) => tripDestination.id === currentId,
      )
        ? null
        : currentId,
    );
  }, [tripDestinations]);

  const hasActiveTripDestinationConfirmation = tripDestinations.some(
    (tripDestination) => tripDestination.id === confirmingTripDestinationId,
  );

  return (
    <section
      aria-busy={areTripDestinationsFetching || areActivitiesFetching}
      aria-labelledby="trip-itinerary-title"
      className="mt-10 border-t border-slate-200 pt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="trip-itinerary-title"
          >
            Itinerario
          </h2>
          <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
            Recorrido, paradas y actividades organizadas en un solo lugar.
          </p>
        </div>

        {hasTripDestinationsResponse &&
        (tripDestinations.length > 0 ||
          (hasActivitiesResponse && activities.length > 0)) ? (
          <p className="text-sm font-medium text-slate-600">
            {tripDestinations.length}{" "}
            {tripDestinations.length === 1 ? "parada" : "paradas"}
            {hasActivitiesResponse ? (
              <>
                {" · "}
                {activities.length}{" "}
                {activities.length === 1 ? "actividad" : "actividades"}
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      {showTripDestinationsLoading ? (
        <div role="status">
          <span className="sr-only">Cargando itinerario del viaje...</span>
          <ItinerarySkeleton />
        </div>
      ) : null}

      {showTripDestinationsInitialError ? (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5"
          role="alert"
        >
          <p className="font-semibold text-red-950">
            No pudimos cargar el itinerario
          </p>
          <p className="mt-2 text-sm leading-6 text-red-900">
            {getTripDestinationsErrorMessage(tripDestinationsError)}
          </p>
          <button
            className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={areTripDestinationsFetching}
            onClick={() => void refetchTripDestinations()}
            type="button"
          >
            {areTripDestinationsFetching
              ? "Reintentando..."
              : "Intentar de nuevo"}
          </button>
        </div>
      ) : null}

      {hasTripDestinationsResponse ? (
        <>
          {showTripDestinationsRefreshing ? (
            <p className="mt-4 text-sm text-slate-600" role="status">
              Actualizando paradas...
            </p>
          ) : null}

          {showTripDestinationsRefreshError ? (
            <div
              className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-amber-950"
              role="status"
            >
              <p className="text-sm leading-6">
                {getTripDestinationsErrorMessage(tripDestinationsError)}{" "}
                Mostramos el último recorrido disponible.
              </p>
              <button
                className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={areTripDestinationsFetching}
                onClick={() => void refetchTripDestinations()}
                type="button"
              >
                Reintentar actualización
              </button>
            </div>
          ) : null}

          {tripDestinations.length > 0 ? (
            <div className="mt-5">
              <TripDestinationsMap
                selectedTripDestinationId={selectedTripDestinationId}
                tripDestinations={tripDestinations}
              />
            </div>
          ) : null}

          {showActivitiesLoading ? (
            <p className="mt-4 text-sm text-slate-600" role="status">
              Cargando actividades...
            </p>
          ) : null}

          {showActivitiesInitialError ? (
            <div
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5"
              role="alert"
            >
              <p className="font-semibold text-red-950">
                No pudimos cargar las actividades
              </p>
              <p className="mt-2 text-sm leading-6 text-red-900">
                {getActivitiesErrorMessage(activitiesError)}
              </p>
              <button
                className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={areActivitiesFetching}
                onClick={() => void refetchActivities()}
                type="button"
              >
                {areActivitiesFetching
                  ? "Reintentando..."
                  : "Intentar de nuevo"}
              </button>
            </div>
          ) : null}

          {showActivitiesRefreshing ? (
            <p className="mt-4 text-sm text-slate-600" role="status">
              Actualizando actividades...
            </p>
          ) : null}

          {showActivitiesRefreshError ? (
            <div
              className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-amber-950"
              role="status"
            >
              <p className="text-sm leading-6">
                {getActivitiesErrorMessage(activitiesError)} Mostramos la última
                agenda disponible.
              </p>
              <button
                className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={areActivitiesFetching}
                onClick={() => void refetchActivities()}
                type="button"
              >
                Reintentar actualización
              </button>
            </div>
          ) : null}

          {hasActivitiesResponse && generalActivities.length > 0 ? (
            <ItineraryActivityGroup
              activities={generalActivities}
              description="Planes que no pertenecen a una parada específica."
              timeZone="UTC"
              title="Agenda general"
            />
          ) : null}

          {hasActivitiesResponse && unmatchedActivities.length > 0 ? (
            <ItineraryActivityGroup
              activities={unmatchedActivities}
              description={
                areActivitiesFetching || areTripDestinationsFetching
                  ? "Estamos actualizando la relación con sus paradas."
                  : "No pudimos relacionarlas con una parada disponible."
              }
              isWarning={!areActivitiesFetching && !areTripDestinationsFetching}
              timeZone={null}
              title="Relación de parada pendiente"
            />
          ) : null}

          {tripDestinations.length === 0 ? (
            <div
              className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-6"
              role="status"
            >
              <p className="font-semibold text-slate-900">
                Este viaje todavía no tiene paradas
              </p>
              <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
                Cuando agregues un destino, aparecerá aquí junto con sus
                actividades.
              </p>
            </div>
          ) : (
            <ol className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {tripDestinations.map((tripDestination) => (
                <ItineraryStopRow
                  activities={
                    activitiesByTripDestinationId.get(tripDestination.id) ?? []
                  }
                  activityGroupState={activityGroupState}
                  canEditTripDestinations={canEditTripDestinations}
                  hasAnotherConfirmationOpen={
                    hasActiveTripDestinationConfirmation &&
                    confirmingTripDestinationId !== tripDestination.id
                  }
                  isConfirming={
                    confirmingTripDestinationId === tripDestination.id
                  }
                  isSelected={selectedTripDestinationId === tripDestination.id}
                  key={tripDestination.id}
                  onCloseConfirmation={() =>
                    setConfirmingTripDestinationId(null)
                  }
                  onOpenConfirmation={() =>
                    setConfirmingTripDestinationId(tripDestination.id)
                  }
                  onToggleSelection={() =>
                    setSelectedTripDestinationId((currentId) =>
                      currentId === tripDestination.id
                        ? null
                        : tripDestination.id,
                    )
                  }
                  tripDestination={tripDestination}
                  tripId={tripId}
                />
              ))}
            </ol>
          )}
        </>
      ) : null}
    </section>
  );
}
