import { MapPinMinus } from "lucide-react";
import { useDeleteTripDestinationMutation } from "./tripDestinationsApi";

type DeleteTripDestinationActionProps = {
  tripId: string;
  tripDestinationId: string;
  destinationName: string;
  isConfirming: boolean;
  onOpenConfirmation: () => void;
  onCloseConfirmation: () => void;
  isDisabled: boolean;
};

export default function DeleteTripDestinationAction({
  tripId,
  tripDestinationId,
  destinationName,
  isConfirming,
  onOpenConfirmation,
  onCloseConfirmation,
  isDisabled,
}: DeleteTripDestinationActionProps) {
  const [deleteTripDestination, { isLoading, isError, isSuccess, reset }] =
    useDeleteTripDestinationMutation();
  const isActionLocked = isLoading || isSuccess;

  function handleOpenConfirmation() {
    if (isDisabled) return;
    reset();
    onOpenConfirmation();
  }

  function handleCancelConfirmation() {
    if (isActionLocked) return;

    reset();
    onCloseConfirmation();
  }

  async function handleConfirmDelete() {
    if (isActionLocked) return;

    try {
      await deleteTripDestination({
        tripId,
        tripDestinationId,
      }).unwrap();
    } catch {
      // isError mantiene abierta la confirmación y muestra el fallo del servidor.
    }
  }

  if (isConfirming) {
    return (
      <div
        aria-busy={isActionLocked}
        className="absolute inset-0 z-10 flex flex-col justify-center gap-3 bg-white/30 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
      >
        <div className="min-w-0">
          <p className="font-semibold text-slate-950">
            ¿Quitar {destinationName} del recorrido?
          </p>
          {isError ? (
            <p
              className="mt-1 text-sm font-medium leading-5 text-red-800"
              role="alert"
            >
              No pudimos quitar esta parada. Intenta nuevamente.
            </p>
          ) : (
            <p className="mt-1 text-sm leading-5 text-slate-700">
              El destino seguirá disponible para otros viajes.
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <button
            autoFocus
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            disabled={isActionLocked}
            onClick={handleCancelConfirmation}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
            disabled={isActionLocked}
            onClick={handleConfirmDelete}
            type="button"
          >
            <MapPinMinus aria-hidden="true" size={16} />
            {isLoading
              ? "Quitando..."
              : isSuccess
                ? "Actualizando..."
                : "Quitar parada"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
      type="button"
      onClick={handleOpenConfirmation}
      disabled={isDisabled}
    >
      <MapPinMinus aria-hidden="true" size={18} />
      <span className="sr-only">Quitar {destinationName} del recorrido</span>
    </button>
  );
}
