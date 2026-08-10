import { useState } from "react";
import { getTripStatusLabel } from "./trip.formatters";
import type { TripStatus } from "./trip.types";
import { useUpdateTripMutation } from "./tripsApi";

type TripStatusActionsProps = {
  tripId: string;
  status: TripStatus;
};

type StatusAction = {
  nextStatus: TripStatus;
  label: string;
  loadingLabel: string;
  variant: "primary" | "cancel";
};

const actionsByStatus: Record<TripStatus, StatusAction[]> = {
  PLANNING: [
    {
      nextStatus: "CONFIRMED",
      label: "Confirmar viaje",
      loadingLabel: "Confirmando...",
      variant: "primary",
    },
    {
      nextStatus: "CANCELLED",
      label: "Cancelar viaje",
      loadingLabel: "Cancelando...",
      variant: "cancel",
    },
  ],
  CONFIRMED: [
    {
      nextStatus: "COMPLETED",
      label: "Marcar como completado",
      loadingLabel: "Completando...",
      variant: "primary",
    },
    {
      nextStatus: "CANCELLED",
      label: "Cancelar viaje",
      loadingLabel: "Cancelando...",
      variant: "cancel",
    },
  ],
  COMPLETED: [],
  CANCELLED: [],
};

const statusClassNames: Record<TripStatus, string> = {
  PLANNING: "bg-amber-100 text-amber-900",
  CONFIRMED: "bg-sky-100 text-sky-900",
  COMPLETED: "bg-emerald-100 text-emerald-900",
  CANCELLED: "bg-red-100 text-red-900",
};

export default function TripStatusActions({
  tripId,
  status,
}: TripStatusActionsProps) {
  const [pendingStatus, setPendingStatus] = useState<TripStatus | null>(null);
  const [updateTrip, { isLoading, isError, isSuccess, reset }] =
    useUpdateTripMutation();

  const availableActions = actionsByStatus[status];

  async function handleStatusChange(nextStatus: TripStatus) {
    reset();
    setPendingStatus(nextStatus);

    try {
      await updateTrip({
        tripId,
        changes: { status: nextStatus },
      }).unwrap();
    } catch {
      // La mutation conserva el error y el componente lo presenta abajo.
    } finally {
      setPendingStatus(null);
    }
  }
  console.log(pendingStatus);

  return (
    <section
      aria-labelledby="trip-status-title"
      aria-busy={isLoading}
      className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="trip-status-title"
            className="text-base font-semibold text-slate-900"
          >
            Estado del viaje
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Actualiza el avance cuando cambie la situación de tu plan.
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClassNames[status]}`}
        >
          {getTripStatusLabel(status)}
        </span>
      </div>

      {availableActions.length > 0 ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {availableActions.map((action) => {
            const isCurrentActionLoading =
              isLoading && pendingStatus === action.nextStatus;

            return (
              <button
                key={action.nextStatus}
                type="button"
                disabled={isLoading}
                onClick={() => void handleStatusChange(action.nextStatus)}
                className={
                  isLoading
                    ? "inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600"
                    : action.variant === "primary"
                      ? "inline-flex items-center justify-center rounded-lg border border-teal-700 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-teal-800 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                      : "inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                }
              >
                {isCurrentActionLoading ? action.loadingLabel : action.label}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {status === "COMPLETED"
            ? "Este viaje ya está completado."
            : "Este viaje está cancelado."}
        </p>
      )}

      {isError ? (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          No pudimos cambiar el estado. Intenta nuevamente.
        </p>
      ) : null}

      {isSuccess ? (
        <p role="status" className="mt-4 text-sm font-medium text-emerald-800">
          Estado actualizado correctamente.
        </p>
      ) : null}
    </section>
  );
}
