import DestinationSearch from "../features/destinations/DestinationSearch";

export default function DestinationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Buscar destinos</h1>
        <p className="mt-3 text-slate-600">
          Consulta ciudades y ubicaciones que podrás agregar posteriormente a
          tus viajes.
        </p>
      </header>

      <DestinationSearch />
    </main>
  );
}
