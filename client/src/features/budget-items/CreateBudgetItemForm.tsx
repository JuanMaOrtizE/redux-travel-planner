import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Activity } from "../activities/activity.types";
import { BUDGET_CATEGORY_OPTIONS } from "./budgetItem.constants";
import { useCreateBudgetItemMutation } from "./budgetItemsApi";
import { mapCreateBudgetItemFormToBody } from "./createBudgetItem.mapper";
import {
  createBudgetItemSchema,
  type CreateBudgetItemFormValues,
} from "./createBudgetItem.schema";

const FIELD_CLASS_NAME =
  "block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors placeholder:text-slate-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

function getFieldClassName(hasError: boolean): string {
  return `${FIELD_CLASS_NAME} ${
    hasError
      ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
      : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
  }`;
}

function getCreateBudgetItemErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const responseData = error.data;

    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "error" in responseData
    ) {
      const responseError = responseData.error;

      if (
        typeof responseError === "object" &&
        responseError !== null &&
        "message" in responseError &&
        typeof responseError.message === "string"
      ) {
        return responseError.message;
      }
    }
  }

  if (typeof error === "object" && error !== null && "status" in error) {
    switch (error.status) {
      case 401:
        return "Tu sesión venció. Inicia sesión nuevamente.";
      case 404:
        return "No encontramos el viaje o la actividad seleccionada.";
      case 409:
        return "El presupuesto de este viaje ya no se puede modificar.";
      case "FETCH_ERROR":
        return "No pudimos conectar con el servidor. Comprueba tu conexión e intenta nuevamente.";
    }
  }

  return "No pudimos crear el gasto. Intenta nuevamente.";
}

type CreateBudgetItemFormProps = {
  activities: Activity[];
  currency: string;
  onCancel: () => void;
  onCreated: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  tripId: string;
};

export default function CreateBudgetItemForm({
  activities,
  currency,
  onCancel,
  onCreated,
  onSubmittingChange,
  tripId,
}: CreateBudgetItemFormProps) {
  const [
    createBudgetItem,
    { isLoading, isError, error, reset: resetMutation },
  ] = useCreateBudgetItemMutation();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateBudgetItemFormValues>({
    resolver: zodResolver(createBudgetItemSchema),
    defaultValues: {
      activityId: "",
      description: "",
      estimatedAmount: "",
      actualAmount: "",
    },
  });

  useEffect(() => {
    onSubmittingChange(isLoading);
  }, [isLoading, onSubmittingChange]);

  useEffect(
    () => () => {
      onSubmittingChange(false);
    },
    [onSubmittingChange],
  );

  async function handleCreateBudgetItemSubmit(
    values: CreateBudgetItemFormValues,
  ): Promise<void> {
    resetMutation();
    const body = mapCreateBudgetItemFormToBody(values);

    try {
      await createBudgetItem({ tripId, body }).unwrap();
      resetForm();
      onCreated();
    } catch {
      // La mutation conserva el error HTTP en `error` para mostrarlo abajo.
    }
  }

  function handleCancel(): void {
    resetMutation();
    resetForm();
    onCancel();
  }

  return (
    <form
      aria-busy={isLoading}
      className="flex max-h-[calc(100dvh-2rem)] flex-col"
      noValidate
      onSubmit={handleSubmit(handleCreateBudgetItemSubmit)}
    >
      <header className="shrink-0 border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2
          className="text-xl font-semibold tracking-tight text-slate-900"
          id="create-budget-item-dialog-title"
        >
          Agregar gasto
        </h2>
        <p
          className="mt-1 max-w-prose text-sm leading-6 text-slate-600"
          id="create-budget-item-dialog-description"
        >
          Registra lo planeado y, cuando lo conozcas, el importe real.
        </p>
      </header>

      <div className="min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
        {isError ? (
          <p
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900"
            role="alert"
          >
            {getCreateBudgetItemErrorMessage(error)}
          </p>
        ) : null}

        <fieldset className="space-y-6" disabled={isLoading}>
          <section aria-labelledby="budget-item-details-title">
            <h3
              className="text-sm font-semibold text-slate-900"
              id="budget-item-details-title"
            >
              Gasto
            </h3>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="budget-item-description"
                >
                  Descripción
                </label>
                <input
                  aria-describedby={
                    errors.description
                      ? "budget-item-description-error"
                      : undefined
                  }
                  aria-invalid={Boolean(errors.description)}
                  autoComplete="off"
                  className={getFieldClassName(Boolean(errors.description))}
                  id="budget-item-description"
                  placeholder="Ej. Hotel en Bogotá"
                  type="text"
                  {...register("description")}
                />
                {errors.description?.message ? (
                  <p
                    className="text-sm text-red-700"
                    id="budget-item-description-error"
                    role="alert"
                  >
                    {errors.description.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="budget-item-category"
                >
                  Categoría
                </label>
                <select
                  aria-describedby={
                    errors.category ? "budget-item-category-error" : undefined
                  }
                  aria-invalid={Boolean(errors.category)}
                  className={getFieldClassName(Boolean(errors.category))}
                  id="budget-item-category"
                  {...register("category")}
                >
                  <option disabled value="">
                    Selecciona una categoría
                  </option>
                  {BUDGET_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category?.message ? (
                  <p
                    className="text-sm text-red-700"
                    id="budget-item-category-error"
                    role="alert"
                  >
                    {errors.category.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="budget-item-activity"
                >
                  Actividad relacionada{" "}
                  <span className="font-normal text-slate-500">
                    (opcional)
                  </span>
                </label>
                <select
                  aria-describedby={
                    errors.activityId
                      ? "budget-item-activity-hint budget-item-activity-error"
                      : "budget-item-activity-hint"
                  }
                  aria-invalid={Boolean(errors.activityId)}
                  className={getFieldClassName(Boolean(errors.activityId))}
                  id="budget-item-activity"
                  {...register("activityId")}
                >
                  <option value="">Gasto general del viaje</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.title}
                    </option>
                  ))}
                </select>
                <p
                  className="text-sm leading-5 text-slate-600"
                  id="budget-item-activity-hint"
                >
                  Relaciónalo solo si el gasto pertenece a una actividad.
                </p>
                {errors.activityId?.message ? (
                  <p
                    className="text-sm text-red-700"
                    id="budget-item-activity-error"
                    role="alert"
                  >
                    {errors.activityId.message}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section aria-labelledby="budget-item-amounts-title">
            <h3
              className="text-sm font-semibold text-slate-900"
              id="budget-item-amounts-title"
            >
              Importes
            </h3>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="budget-item-estimated-amount"
                >
                  Estimado ({currency})
                </label>
                <input
                  aria-describedby={
                    errors.estimatedAmount
                      ? "budget-item-estimated-amount-error"
                      : undefined
                  }
                  aria-invalid={Boolean(errors.estimatedAmount)}
                  autoComplete="off"
                  className={getFieldClassName(
                    Boolean(errors.estimatedAmount),
                  )}
                  id="budget-item-estimated-amount"
                  inputMode="decimal"
                  placeholder="0.00"
                  type="text"
                  {...register("estimatedAmount")}
                />
                {errors.estimatedAmount?.message ? (
                  <p
                    className="text-sm text-red-700"
                    id="budget-item-estimated-amount-error"
                    role="alert"
                  >
                    {errors.estimatedAmount.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="budget-item-actual-amount"
                >
                  Real ({currency}){" "}
                  <span className="font-normal text-slate-500">
                    (opcional)
                  </span>
                </label>
                <input
                  aria-describedby={
                    errors.actualAmount
                      ? "budget-item-actual-amount-hint budget-item-actual-amount-error"
                      : "budget-item-actual-amount-hint"
                  }
                  aria-invalid={Boolean(errors.actualAmount)}
                  autoComplete="off"
                  className={getFieldClassName(Boolean(errors.actualAmount))}
                  id="budget-item-actual-amount"
                  inputMode="decimal"
                  placeholder="0.00"
                  type="text"
                  {...register("actualAmount")}
                />
                <p
                  className="text-sm leading-5 text-slate-600"
                  id="budget-item-actual-amount-hint"
                >
                  Puedes completarlo cuando el gasto ocurra.
                </p>
                {errors.actualAmount?.message ? (
                  <p
                    className="text-sm text-red-700"
                    id="budget-item-actual-amount-error"
                    role="alert"
                  >
                    {errors.actualAmount.message}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </fieldset>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          disabled={isLoading}
          onClick={handleCancel}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Guardando gasto..." : "Agregar gasto"}
        </button>
      </div>
    </form>
  );
}
