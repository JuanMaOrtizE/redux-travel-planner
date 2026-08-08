import CreateTripForm from "../features/trips/CreateTripForm";

export default function CreateTripPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Crear viaje</h1>

        <p className="mt-3 text-slate-600">
          Define las fechas y la información principal para comenzar a organizar
          tu viaje.
        </p>
      </header>
      <CreateTripForm />
    </main>
  );
}
