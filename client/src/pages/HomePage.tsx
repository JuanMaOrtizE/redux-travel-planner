import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import StatCard from "../components/StatCard";
import { useGetTripsQuery } from "../features/trips/tripsApi";
import { selectViewMode } from "../features/ui/uiSlice";
import ViewModeToggle from "../features/ui/ViewModeToggle";

export default function HomePage() {
  const viewMode = useAppSelector(selectViewMode);
  const { data, isLoading, isFetching, isError, refetch } = useGetTripsQuery();
  const trips = data?.data.trips ?? [];
  const planningTrips = trips.filter(
    (trip) => trip.status === "PLANNING",
  ).length;
  const tripsWithBudget = trips.filter(
    (trip) => trip.budgetLimit !== null,
  ).length;

  const summaryLayoutClassName =
    viewMode === "grid"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
      : "flex flex-col gap-4";

  const hasCachedData = data !== undefined;
  const showInitialError = isError && !hasCachedData;

  return (
    <main className="bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-start">
        <header className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold text-teal-700">
            Tu espacio de planificación
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Planifica tus viajes en un solo lugar
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 text-pretty">
            Organiza destinos, itinerarios, actividades, presupuesto y clima
            para preparar cada viaje con más claridad.
          </p>

          <div className="mt-8">
            <Link
              to="/trips/new"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Crear viaje
            </Link>
          </div>
        </header>

        <aside className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Resumen de tus viajes
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Información calculada con tus planes guardados.
              </p>
            </div>

            {!isLoading && !showInitialError && trips.length > 0 ? (
              <ViewModeToggle />
            ) : null}
          </div>

          {isLoading ? (
            <section
              aria-label="Cargando resumen de viajes"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {[0, 1, 2].map((item) => (
                <article
                  key={item}
                  className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 motion-reduce:animate-none"
                >
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-4 h-9 w-14 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-100" />
                </article>
              ))}
            </section>
          ) : showInitialError ? (
            <section
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-6"
            >
              <h3 className="font-semibold text-red-950">
                No pudimos cargar tu resumen
              </h3>
              <p className="mt-2 text-sm leading-6 text-red-900">
                Tus viajes siguen guardados. Comprueba la conexión e inténtalo
                nuevamente.
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
          ) : trips.length === 0 ? (
            <section className="rounded-xl border border-dashed border-teal-300 bg-teal-50 p-6">
              <h3 className="font-semibold text-teal-950">
                Tu primer viaje empieza aquí
              </h3>
              <p className="mt-2 text-sm leading-6 text-teal-900">
                Crea un viaje para comenzar a organizar fechas, presupuesto y
                próximos destinos.
              </p>
            </section>
          ) : (
            <section className={summaryLayoutClassName}>
              <StatCard
                label="Viajes creados"
                value={String(trips.length)}
                variant={viewMode}
                description="Todos los planes que tienes guardados."
              />
              <StatCard
                label="En planificación"
                value={String(planningTrips)}
                variant={viewMode}
                description="Viajes en los que todavía estás trabajando."
              />
              <StatCard
                label="Con presupuesto"
                value={String(tripsWithBudget)}
                variant={viewMode}
                description="Planes que ya tienen un límite de gasto."
              />
            </section>
          )}

          {isError && hasCachedData ? (
            <div
              role="status"
              className="flex flex-col gap-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>Mostramos la última información disponible.</p>
              <button
                type="button"
                disabled={isFetching}
                onClick={() => void refetch()}
                className="self-start font-semibold underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                {isFetching ? "Actualizando..." : "Reintentar"}
              </button>
            </div>
          ) : isFetching && !isLoading && !showInitialError ? (
            <p role="status" className="text-sm text-slate-600">
              Actualizando resumen...
            </p>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
