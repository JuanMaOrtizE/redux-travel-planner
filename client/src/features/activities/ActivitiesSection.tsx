import { getActivityStatusLabel } from "./activity.formatters";
import { useGetActivitiesQuery } from "./activitiesApi";

type ActivitiesSectionProps = {
  tripId: string;
};

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

export default function ActivitiesSection({
  tripId,
}: ActivitiesSectionProps) {
  const {
    currentData: activitiesResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetActivitiesQuery(tripId);

  const activities = activitiesResponse?.data.activities ?? [];
  const hasCurrentResponse = activitiesResponse !== undefined;
  const showLoadingState =
    isLoading || (isFetching && activitiesResponse === undefined);
  const showInitialError = isError && !hasCurrentResponse && !isFetching;
  const showRefreshingState = isFetching && hasCurrentResponse;
  const showRefreshError = isError && hasCurrentResponse && !isFetching;

  return (
    <section
      aria-busy={isFetching}
      aria-labelledby="activities-title"
      className="mt-10 border-t border-slate-200 pt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="activities-title"
          >
            Actividades
          </h2>
          <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
            Organiza los planes y horarios del viaje.
          </p>
        </div>

        {hasCurrentResponse && activities.length > 0 ? (
          <p className="text-sm font-medium text-slate-600">
            {activities.length}{" "}
            {activities.length === 1 ? "actividad" : "actividades"}
          </p>
        ) : null}
      </div>

      {showLoadingState ? (
        <div className="mt-5" role="status">
          <span className="sr-only">Cargando actividades del viaje...</span>
          <div
            aria-hidden="true"
            className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white animate-pulse motion-reduce:animate-none"
          >
            {[0, 1, 2].map((item) => (
              <div
                className="flex items-center justify-between gap-4 p-5"
                key={item}
              >
                <div className="h-5 w-44 max-w-full rounded bg-slate-200" />
                <div className="h-7 w-24 shrink-0 rounded-full bg-slate-100" />
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
            No pudimos cargar las actividades
          </p>
          <p className="mt-2 text-sm leading-6 text-red-900">
            {getActivitiesErrorMessage(error)}
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
          Actualizando actividades...
        </p>
      ) : null}

      {showRefreshError ? (
        <div
          className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-amber-950"
          role="status"
        >
          <p className="text-sm leading-6">
            {getActivitiesErrorMessage(error)} Mostramos la última lista
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

      {hasCurrentResponse && activities.length === 0 ? (
        <div
          className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-6"
          role="status"
        >
          <p className="font-semibold text-slate-900">
            Este viaje todavía no tiene actividades
          </p>
          <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
            Cuando agregues una actividad, aparecerá aquí dentro de la agenda
            del viaje.
          </p>
        </div>
      ) : null}

      {hasCurrentResponse && activities.length > 0 ? (
        <ol className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {activities.map((activity) => (
            <li
              className="flex min-w-0 items-center justify-between gap-4 p-5"
              key={activity.id}
            >
              <p className="min-w-0 wrap-break-words font-semibold text-slate-900">
                {activity.title}
              </p>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {getActivityStatusLabel(activity.status)}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
