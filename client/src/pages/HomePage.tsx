import { useAppSelector } from "../app/hooks";
import StatCard from "../components/StatCard";
import { selectViewMode } from "../features/ui/uiSlice";
import ViewModeToggle from "../features/ui/ViewModeToggle";

export default function HomePage() {
  const viewMode = useAppSelector(selectViewMode);
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-start">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Planifica tus viajes en un solo lugar
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Organiza destinos, itinerarios, actividades, presupuesto y clima
            para preparar cada viaje con más claridad.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white
              hover:bg-teal-800"
            >
              Crear viaje
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-white"
            >
              Ver destinos
            </button>
          </div>
        </header>

        <aside className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">Resumen</h2>
            <ViewModeToggle />
          </div>

          <section
            className={
              viewMode === "grid"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                : "flex flex-col gap-4"
            }
          >
            <StatCard
              label="Viajes próximos"
              value="3"
              variant={viewMode}
              description="Planes activos para las prócximas semanas."
            />
            <StatCard
              label="Presupuesto estimado"
              value="$1.250"
              variant={viewMode}
              description="Suma inicial de transporte, hospedaje y actividades."
            />
            <StatCard
              label="Destinos guardados"
              value="8"
              variant={viewMode}
              description="Ciudades candidatas para próximos itinerarios."
            />
          </section>
        </aside>
      </section>
    </main>
  );
}
