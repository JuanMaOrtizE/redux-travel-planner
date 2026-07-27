import StatCard from "../components/StatCard";
import { useAppSelector } from "../app/hooks";
import { selectViewMode } from "../features/ui/uiSlice";

export default function HomePage() {
  const viewMode = useAppSelector(selectViewMode);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="max-w-3xl">
          <p className="mt-5 text-sm font-medium text-slate-500">
            vistaActual: {viewMode}
          </p>
          <p className="mb-3 text-sm font-semibold text-teal-700">
            Travel Planner
          </p>

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

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Viajes próximos"
            value="3"
            description="Planes activos para las prócximas semanas."
          />
          <StatCard
            label="Presupuesto estimado"
            value="$1.250"
            description="uma inicial de transporte, hospedaje y actividades."
          />
          <StatCard
            label="Destinos guardados"
            value="8"
            description="Ciudades candidatas para próximos itinerarios."
          />
        </section>
      </section>
    </main>
  );
}
