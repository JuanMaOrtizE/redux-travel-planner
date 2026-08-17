import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router-dom";
import { useGetTripQuery } from "../features/trips/tripsApi";
import DeleteTripAction from "../features/trips/DeleteTripAction";
import TripStatusActions from "../features/trips/TripStatusActions";
import TripDestinationsSection from "../features/trip-destinations/TripDestinationsSection";

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();

  const {
    data: tripResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetTripQuery(tripId ?? skipToken);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section
          aria-label="Cargando viaje"
          className="max-w-2xl animate-pulse motion-reduce:animate-none"
        >
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="mt-6 h-9 w-72 max-w-full rounded bg-slate-200" />
          <div className="mt-4 h-5 w-full rounded bg-slate-100" />
          <div className="mt-8 h-56 rounded-xl bg-slate-100" />
        </section>
      </main>
    );
  }

  if (isError && tripResponse === undefined) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section
          role="alert"
          className="max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h1 className="text-xl font-semibold text-red-950">
            No pudimos cargar el viaje
          </h1>
          <p className="mt-2 text-sm leading-6 text-red-900">
            Comprueba la conexión e intenta nuevamente.
          </p>

          <button
            type="button"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Reintentando..." : "Intentar de nuevo"}
          </button>
        </section>
      </main>
    );
  }

  const trip = tripResponse?.data.trip;

  if (!trip) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>No pudimos identificar el viaje.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-2xl">
        <Link
          to="/trips"
          className="text-sm font-semibold text-teal-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          ← Volver a viajes
        </Link>

        {isFetching ? (
          <p role="status" className="mt-5 text-sm text-slate-600">
            Actualizando información del viaje...
          </p>
        ) : null}

        {isError ? (
          <p
            role="status"
            className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-950"
          >
            No pudimos actualizar la información. Mostramos la última versión
            disponible.
          </p>
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight">{trip.title}</h1>

        <p className="mt-3 text-slate-600">
          {trip.description ?? "Este viaje no tiene una descripción."}
        </p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">
              Fecha inicial
            </dt>
            <dd className="mt-1 text-slate-900">{trip.startDate}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Fecha final</dt>
            <dd className="mt-1 text-slate-900">{trip.endDate}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Presupuesto</dt>
            <dd className="mt-1 text-slate-900">
              {trip.budgetLimit
                ? `${trip.currency} ${trip.budgetLimit}`
                : "Sin presupuesto definido."}
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <TripStatusActions tripId={trip.id} status={trip.status} />
          <TripDestinationsSection tripId={trip.id} />
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-slate-900">
            Zona de peligro
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Eliminar un viaje borra definitivamente su información.
          </p>
          <div className="mt-4">
            <DeleteTripAction tripId={trip.id} tripTitle={trip.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
