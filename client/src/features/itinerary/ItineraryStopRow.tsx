import ActivityGroupList from "../activities/ActivityGroupList";
import type { Activity } from "../activities/activity.types";
import DeleteTripDestinationAction from "../trip-destinations/DeleteTripDestinationAction";
import {
  getDateLabel,
  getDestinationContext,
} from "../trip-destinations/tripDestination.formatters";
import type { TripDestination } from "../trip-destinations/tripDestination.types";

type ActivityGroupState = "loading" | "error" | "ready";

type ItineraryStopRowProps = {
  activities: Activity[];
  activityGroupState: ActivityGroupState;
  canEditTripDestinations: boolean;
  hasAnotherConfirmationOpen: boolean;
  isConfirming: boolean;
  isSelected: boolean;
  onCloseConfirmation: () => void;
  onOpenConfirmation: () => void;
  onToggleSelection: () => void;
  tripDestination: TripDestination;
  tripId: string;
};

function ActivityGroupSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-3 animate-pulse motion-reduce:animate-none"
    >
      <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
      <div className="h-5 w-36 max-w-full rounded bg-slate-100" />
    </div>
  );
}

export default function ItineraryStopRow({
  activities,
  activityGroupState,
  canEditTripDestinations,
  hasAnotherConfirmationOpen,
  isConfirming,
  isSelected,
  onCloseConfirmation,
  onOpenConfirmation,
  onToggleSelection,
  tripDestination,
  tripId,
}: ItineraryStopRowProps) {
  const destinationContext = getDestinationContext(tripDestination);
  const destinationName = tripDestination.destination.name;

  return (
    <li className="grid min-w-0 bg-white lg:grid-cols-12">
      <div
        className={`relative flex min-h-32 min-w-0 items-start gap-3 p-4 transition-colors motion-reduce:transition-none sm:p-5 lg:col-span-4 lg:p-6 ${isSelected ? "bg-teal-50" : "bg-white"}`}
      >
        <button
          aria-pressed={isSelected}
          className="flex min-w-0 flex-1 cursor-pointer items-start gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-teal-700"
          onClick={onToggleSelection}
          type="button"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-800">
            <span className="sr-only">Parada </span>
            {tripDestination.position}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block wrap-break-words font-semibold text-slate-900">
              {destinationName}
            </span>

            {destinationContext ? (
              <span className="mt-1 block wrap-break-words text-sm text-slate-600">
                {destinationContext}
              </span>
            ) : null}

            <span className="mt-3 block text-sm font-medium text-slate-700">
              {getDateLabel(tripDestination)}
            </span>

            {tripDestination.notes ? (
              <span className="mt-2 block wrap-break-words text-sm leading-6 text-slate-600">
                {tripDestination.notes}
              </span>
            ) : null}
          </span>
        </button>

        {canEditTripDestinations ? (
          <DeleteTripDestinationAction
            destinationName={destinationName}
            tripDestinationId={tripDestination.id}
            tripId={tripId}
            isConfirming={isConfirming}
            onOpenConfirmation={onOpenConfirmation}
            onCloseConfirmation={onCloseConfirmation}
            isDisabled={hasAnotherConfirmationOpen}
          />
        ) : null}
      </div>

      <div className="min-w-0 border-t border-slate-200 p-4 sm:p-5 lg:col-span-8 lg:border-l lg:border-t-0 lg:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">Actividades</h3>
          {activityGroupState === "ready" && activities.length > 0 ? (
            <p className="text-sm text-slate-500">
              {activities.length}{" "}
              {activities.length === 1 ? "actividad" : "actividades"}
            </p>
          ) : null}
        </div>

        {activityGroupState === "loading" ? <ActivityGroupSkeleton /> : null}

        {activityGroupState === "error" ? (
          <p className="text-sm text-slate-500">
            Las actividades no están disponibles en este momento.
          </p>
        ) : null}

        {activityGroupState === "ready" ? (
          <ActivityGroupList
            activities={activities}
            emptyMessage="Sin actividades para esta parada."
            label={`Actividades de ${destinationName}`}
          />
        ) : null}
      </div>
    </li>
  );
}
