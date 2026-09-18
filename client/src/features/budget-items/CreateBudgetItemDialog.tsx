import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import type { Activity } from "../activities/activity.types";
import { useGetActivitiesQuery } from "../activities/activitiesApi";
import CreateBudgetItemForm from "./CreateBudgetItemForm";

const EMPTY_ACTIVITIES: Activity[] = [];

type CreateBudgetItemDialogProps = {
  currency: string;
  tripId: string;
};

export default function CreateBudgetItemDialog({
  currency,
  tripId,
}: CreateBudgetItemDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasCreated, setWasCreated] = useState(false);

  const { currentData: activitiesResponse } = useGetActivitiesQuery(tripId);
  const activities =
    activitiesResponse?.data.activities ?? EMPTY_ACTIVITIES;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [isOpen]);

  function handleOpenDialog(): void {
    setWasCreated(false);
    setIsOpen(true);
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
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        onClick={handleOpenDialog}
        ref={triggerButtonRef}
        type="button"
      >
        Agregar gasto
      </button>

      {wasCreated ? (
        <p className="text-sm font-medium text-teal-800" role="status">
          Gasto creado. Actualizando el presupuesto...
        </p>
      ) : null}

      <dialog
        aria-busy={isSubmitting}
        aria-describedby="create-budget-item-dialog-description"
        aria-labelledby="create-budget-item-dialog-title"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
        onCancel={handleDialogCancel}
        onClick={handleDialogBackdropClick}
        onClose={() => {
          setIsOpen(false);
          setIsSubmitting(false);
          triggerButtonRef.current?.focus();
        }}
        ref={dialogRef}
      >
        {isOpen ? (
          <CreateBudgetItemForm
            activities={activities}
            currency={currency}
            onCancel={() => handleCloseDialog()}
            onCreated={handleCreated}
            onSubmittingChange={setIsSubmitting}
            tripId={tripId}
          />
        ) : null}
      </dialog>
    </div>
  );
}
