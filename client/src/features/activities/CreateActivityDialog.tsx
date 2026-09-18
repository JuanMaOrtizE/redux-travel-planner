import {
  useRef,
  useState,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import type { TripDestination } from "../trip-destinations/tripDestination.types";
import CreateActivityForm from "./CreateActivityForm";

type CreateActivityDialogProps = {
  isDisabled: boolean;
  tripDestinations: TripDestination[];
  tripEndDate: string;
  tripId: string;
  tripStartDate: string;
};

export default function CreateActivityDialog({
  isDisabled,
  tripDestinations,
  tripEndDate,
  tripId,
  tripStartDate,
}: CreateActivityDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasCreated, setWasCreated] = useState(false);

  function handleOpenDialog(): void {
    setWasCreated(false);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  function handleCloseDialog(force = false): void {
    if (isSubmitting && !force) return;

    dialogRef.current?.close();
  }

  function handleDialogCancel(
    event: SyntheticEvent<HTMLDialogElement>,
  ): void {
    if (isSubmitting) {
      event.preventDefault();
    }
  }

  function handleDialogBackdropClick(
    event: MouseEvent<HTMLDialogElement>,
  ): void {
    if (event.target === event.currentTarget) {
      handleCloseDialog();
    }
  }

  function handleCreated(): void {
    setWasCreated(true);
    handleCloseDialog(true);
  }

  return (
    <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-end">
      <button
        aria-haspopup="dialog"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 sm:w-auto"
        disabled={isDisabled}
        onClick={handleOpenDialog}
        type="button"
      >
        Agregar actividad
      </button>

      {wasCreated ? (
        <p className="text-sm font-medium text-teal-800" role="status">
          Actividad creada. Actualizando el itinerario...
        </p>
      ) : null}

      <dialog
        aria-busy={isSubmitting}
        aria-describedby="create-activity-dialog-description"
        aria-labelledby="create-activity-dialog-title"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
        onCancel={handleDialogCancel}
        onClick={handleDialogBackdropClick}
        onClose={() => {
          setIsOpen(false);
          setIsSubmitting(false);
        }}
        ref={dialogRef}
      >
        {isOpen ? (
          <CreateActivityForm
            onCancel={() => handleCloseDialog()}
            onCreated={handleCreated}
            onSubmittingChange={setIsSubmitting}
            tripDestinations={tripDestinations}
            tripEndDate={tripEndDate}
            tripId={tripId}
            tripStartDate={tripStartDate}
          />
        ) : null}
      </dialog>
    </div>
  );
}
