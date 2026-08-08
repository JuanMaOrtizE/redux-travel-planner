import { Link } from "react-router-dom";
import { useGetTripsQuery } from "../features/trips/tripsApi";

export default function TripsPage() {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: tripsResponse,
    refetch,
  } = useGetTripsQuery();

  const trips = tripsResponse?.data.trips ?? [];
  const isUnauthorized =
    error !== undefined && "status" in error && error.status === 401;

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Cargando viajes...</p>
      </main>
    );
  }

  if (isFetching && tripsResponse === undefined) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Reintentando viajes...</p>
      </main>
    );
  }

  if (isUnauthorized) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section
          className="rounded-xl border border-red-200 bg-red-50 p-6"
          role="alert"
        >
          <h1 className="text-lg font-semibold text-red-900">
            Necesitas iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-red-700">
            Inicia sesión para consultar y administrar tus viajes.
          </p>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section
          className="rounded-xl border border-red-200 bg-red-50 p-6"
          role="alert"
        >
          <h1 className="text-lg font-semibold text-red-900">
            No pudimos cargar tus viajes
          </h1>
          <p className="mt-2 text-sm text-red-700">
            Intenta nuevamente en unos momentos.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Reintentar
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Viajes</h1>
        <p className="mt-3 text-slate-600">
          Aquí aparecerán los viajes que planifiques.
        </p>

        <Link
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          to="/trips/new"
        >
          Crear viaje
        </Link>
      </section>

      {trips.length === 0 ? (
        <section className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8">
          <h2 className="text-lg font-semibold">Todavía no hay viajes</h2>
          <p className="mt-2 text-sm text-slate-600">
            Más adelante podrás crear viajes, agregar destinos y organizar tu
            itinerario.
          </p>
        </section>
      ) : (
        <section className="mt-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {trips.map((trip) => (
              <li key={trip.id}>
                <Link
                  className="block rounded-xl border border-slate-200 bg-white p-5"
                  to={`/trips/${trip.id}`}
                >
                  <h2 className="text-lg font-semibold">{trip.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {trip.startDate} — {trip.endDate}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
