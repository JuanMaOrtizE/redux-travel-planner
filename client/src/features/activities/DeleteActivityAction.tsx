import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteActivityMutation } from "./activitiesApi";

type DeleteActivityActionProps = {
  tripId: string;
  activityId: string;
  activityTitle: string;
  isConfirming: boolean;
  isDisabled: boolean;
  onOpenConfirmation: () => void;
  onCloseConfirmation: () => void;
};

export default function DeleteActivityAction({
  tripId,
  activityId,
  activityTitle,
  isConfirming,
  isDisabled,
  onOpenConfirmation,
  onCloseConfirmation,
}: DeleteActivityActionProps) {
  const [deleteActivity, { isLoading, isError, isSuccess, reset }] =
    useDeleteActivityMutation();
  const isActionLocked = isLoading || isSuccess;
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const wasConfirmingRef = useRef(isConfirming);

  useEffect(() => {
    if (wasConfirmingRef.current && !isConfirming) {
      openButtonRef.current?.focus();
    }

    wasConfirmingRef.current = isConfirming;
  }, [isConfirming]);

  function handleOpenConfirmation(): void {
    if (isDisabled) return;

    reset();
    onOpenConfirmation();
  }

  function handleCancelConfirmation(): void {
    if (isActionLocked) return;

    reset();
    onCloseConfirmation();
  }

  async function handleConfirmDelete(): Promise<void> {
    if (isActionLocked) return;

    try {
      await deleteActivity({ tripId, activityId }).unwrap();
    } catch {
      // isError conserva la confirmación y permite que el usuario reintente.
    }
  }

  if (isConfirming) {
    return (
      <div
        aria-busy={isActionLocked}
        className="z-10 col-start-1 row-start-1 flex min-w-0 flex-col justify-center gap-3 bg-white/15 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <p className="wrap-break-words font-semibold text-slate-950">
            ¿Eliminar “{activityTitle}”?
          </p>
          {isError ? (
            <p
              className="mt-1 text-sm font-medium leading-5 text-red-800"
              role="alert"
            >
              No pudimos eliminar esta actividad. Intenta nuevamente.
            </p>
          ) : (
            <p className="mt-1 text-sm leading-5 text-slate-700">
              Esta acción no se puede deshacer.
            </p>
          )}
        </div>

        <div className="grid w-full shrink-0 grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2">
          <button
            autoFocus
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            disabled={isActionLocked}
            onClick={handleCancelConfirmation}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:bg-red-700 disabled:text-white disabled:opacity-50"
            disabled={isActionLocked}
            onClick={handleConfirmDelete}
            type="button"
          >
            <Trash2 aria-hidden="true" size={16} />
            {isLoading
              ? "Eliminando..."
              : isSuccess
                ? "Actualizando..."
                : "Eliminar actividad"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 shrink-0 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:text-red-300 disabled:hover:bg-transparent"
      disabled={isDisabled}
      onClick={handleOpenConfirmation}
      ref={openButtonRef}
      type="button"
    >
      <Trash2 aria-hidden="true" size={18} />
      <span className="sr-only">Eliminar {activityTitle}</span>
    </button>
  );
}
