import { BUDGET_CATEGORY_OPTIONS } from "./budgetItem.constants";
import type { BudgetCategory, BudgetItem } from "./budgetItem.types";
import { useGetBudgetItemsQuery } from "./budgetItemsApi";
import CreateBudgetItemDialog from "./CreateBudgetItemDialog";

const EMPTY_BUDGET_ITEMS: BudgetItem[] = [];

type TripBudgetSectionProps = {
  canEditBudgetItems: boolean;
  currency: string;
  tripId: string;
};

function getBudgetCategoryLabel(category: BudgetCategory): string {
  return (
    BUDGET_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category
  );
}

function getBudgetItemsErrorMessage(error: unknown): string {
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

  return "No pudimos cargar el presupuesto del viaje. Intenta nuevamente.";
}

function BudgetItemsSkeleton() {
  return (
    <div
      className="mt-5 animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white motion-reduce:animate-none"
      role="status"
    >
      <span className="sr-only">Cargando presupuesto...</span>
      {[0, 1].map((item) => (
        <div
          aria-hidden="true"
          className="grid gap-4 border-b border-slate-200 p-4 last:border-b-0 md:grid-cols-[minmax(0,1.4fr)_minmax(7rem,0.7fr)_minmax(8rem,0.7fr)_minmax(8rem,0.7fr)] md:items-center"
          key={item}
        >
          <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-100" />
          <div className="h-5 w-28 rounded bg-slate-100" />
          <div className="h-5 w-24 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function TripBudgetSection({
  canEditBudgetItems,
  currency,
  tripId,
}: TripBudgetSectionProps) {
  const {
    currentData: budgetItemsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetBudgetItemsQuery(tripId);

  const budgetItems =
    budgetItemsResponse?.data.budgetItems ?? EMPTY_BUDGET_ITEMS;
  const hasResponse = budgetItemsResponse !== undefined;
  const showInitialLoading = isLoading || (isFetching && !hasResponse);
  const showInitialError = isError && !hasResponse && !isFetching;
  const showRefreshing = isFetching && hasResponse;
  const showRefreshError = isError && hasResponse && !isFetching;

  return (
    <section
      aria-labelledby="trip-budget-title"
      className="mt-10 border-t border-slate-200 pt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            className="text-lg font-semibold text-slate-950"
            id="trip-budget-title"
          >
            Presupuesto
          </h2>
          <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
            Compara los importes planeados con los gastos reales del viaje.
          </p>
        </div>

        {hasResponse ? (
          <p className="text-sm font-medium text-slate-700">
            {budgetItems.length} {budgetItems.length === 1 ? "partida" : "partidas"}
          </p>
        ) : null}
      </div>

      {showRefreshing ? (
        <p className="mt-4 text-sm text-slate-600" role="status">
          Actualizando presupuesto...
        </p>
      ) : null}

      {showRefreshError ? (
        <div
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          <p>No pudimos actualizar el presupuesto. Mostramos la última versión disponible.</p>
          <button
            className="min-h-11 rounded-lg border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            onClick={() => void refetch()}
            type="button"
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {showInitialLoading ? <BudgetItemsSkeleton /> : null}

      {showInitialError ? (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5"
          role="alert"
        >
          <p className="font-semibold text-red-950">
            No pudimos cargar el presupuesto
          </p>
          <p className="mt-1 max-w-prose text-sm leading-6 text-red-900">
            {getBudgetItemsErrorMessage(error)}
          </p>
          <button
            className="mt-4 min-h-11 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            onClick={() => void refetch()}
            type="button"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : null}

      {hasResponse && budgetItems.length === 0 ? (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-6">
          <p className="font-semibold text-slate-900">
            Aún no hay gastos registrados
          </p>
          <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
            Las partidas aparecerán aquí para comparar lo estimado con el gasto
            real.
          </p>
        </div>
      ) : null}

      {hasResponse && budgetItems.length > 0 ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div
            aria-hidden="true"
            className="hidden border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(7rem,0.7fr)_minmax(8rem,0.7fr)_minmax(8rem,0.7fr)] md:gap-4"
          >
            <span>Descripción</span>
            <span>Categoría</span>
            <span>Estimado</span>
            <span>Real</span>
          </div>

          <ul className="divide-y divide-slate-200">
            {budgetItems.map((budgetItem) => (
              <li
                className="grid gap-4 p-5 md:grid-cols-[minmax(0,1.4fr)_minmax(7rem,0.7fr)_minmax(8rem,0.7fr)_minmax(8rem,0.7fr)] md:items-center"
                key={budgetItem.id}
              >
                <p className="wrap-break-words font-semibold text-slate-950">
                  {budgetItem.description}
                </p>

                <div>
                  <span className="text-xs font-medium text-slate-500 md:sr-only">
                    Categoría
                  </span>
                  <p className="mt-1 text-sm text-slate-700 md:mt-0">
                    {getBudgetCategoryLabel(budgetItem.category)}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-medium text-slate-500 md:sr-only">
                    Estimado
                  </span>
                  <p className="mt-1 text-sm font-medium text-slate-900 md:mt-0">
                    {currency} {budgetItem.estimatedAmount}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-medium text-slate-500 md:sr-only">
                    Real
                  </span>
                  <p className="mt-1 text-sm font-medium text-slate-900 md:mt-0">
                    {budgetItem.actualAmount === null
                      ? "Pendiente"
                      : `${currency} ${budgetItem.actualAmount}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {canEditBudgetItems && hasResponse ? (
        <CreateBudgetItemDialog currency={currency} tripId={tripId} />
      ) : null}
    </section>
  );
}
