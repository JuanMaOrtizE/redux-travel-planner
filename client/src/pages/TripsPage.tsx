import { useGetTripsQuery } from "../features/trips/tripsApi";

export default function TripsPage() {
  const { isLoading, isError, error, data: tripsResponse } = useGetTripsQuery();

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
              <li
                key={trip.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h2 className="text-lg font-semibold">{trip.title}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {trip.startDate} — {trip.endDate}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
