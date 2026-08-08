import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { useGetTripQuery } from "../features/trips/tripsApi";
import { getTripStatusLabel } from "../features/trips/trip.formatters";

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
        <p>Cargando viaje...</p>
      </main>
    );
  }

  if (isFetching) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Reintentando viaje...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section role="alert">
          <h1>No pudimos cargar el viaje</h1>
          <p>Intenta nuevamente en unos momentos.</p>

          <button type="button" onClick={() => refetch()}>
            Reintentar
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

          <div>
            <dt className="text-sm font-medium text-slate-500">Estado</dt>
            <dd className="mt-1 text-slate-900">
              {getTripStatusLabel(trip.status)}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
