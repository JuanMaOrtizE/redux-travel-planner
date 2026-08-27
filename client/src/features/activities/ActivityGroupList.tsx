import {
  formatActivityDayLabel,
  formatActivityDateTime,
  getActivityStatusLabel,
} from "./activity.formatters";
import { groupActivitiesByLocalDay } from "./activity.groups";
import type { Activity } from "./activity.types";
import DeleteActivityAction from "./DeleteActivityAction";

type ActivityGroupListProps = {
  activities: Activity[];
  canEditActivities: boolean;
  confirmingActivityId: string | null;
  emptyMessage: string;
  hasTripDestinationConfirmationOpen: boolean;
  label: string;
  onCloseActivityConfirmation: () => void;
  onOpenActivityConfirmation: (activityId: string) => void;
  timeZone: string | null;
  tripId: string;
};

export default function ActivityGroupList({
  activities,
  canEditActivities,
  confirmingActivityId,
  emptyMessage,
  hasTripDestinationConfirmationOpen,
  label,
  onCloseActivityConfirmation,
  onOpenActivityConfirmation,
  timeZone,
  tripId,
}: ActivityGroupListProps) {
  if (activities.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  const activityDayGroups =
    timeZone === null
      ? [{ dayKey: null, activities }]
      : groupActivitiesByLocalDay(activities, timeZone);

  const renderActivity = (activity: Activity) => {
    const startsAtLabel =
      timeZone === null
        ? null
        : formatActivityDateTime(activity.startsAt, timeZone);
    const endsAtLabel =
      timeZone === null || activity.endsAt === null
        ? null
        : formatActivityDateTime(activity.endsAt, timeZone);
    const isConfirming = confirmingActivityId === activity.id;
    const hasAnotherActivityConfirmation =
      confirmingActivityId !== null && !isConfirming;

    return (
      <li
        className={`relative grid min-w-0 py-3 last:pb-0 ${timeZone === null ? "first:pt-0" : ""}`}
        key={activity.id}
      >
        <div
          className={`col-start-1 row-start-1 min-w-0 ${canEditActivities ? "pr-12" : ""}`}
        >
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <p className="min-w-0 wrap-break-words font-semibold text-slate-900">
              {activity.title}
            </p>
            <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {getActivityStatusLabel(activity.status)}
            </span>
          </div>

          {startsAtLabel ? (
            <p className="mt-2 text-sm font-medium text-slate-700">
              <time dateTime={activity.startsAt}>{startsAtLabel}</time>
              {endsAtLabel && activity.endsAt ? (
                <>
                  <span aria-hidden="true"> – </span>
                  <span className="sr-only">hasta </span>
                  <time dateTime={activity.endsAt}>{endsAtLabel}</time>
                </>
              ) : null}
              {timeZone === "UTC" ? " · UTC" : null}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Horario pendiente</p>
          )}

          {activity.locationName ? (
            <p className="mt-1 wrap-break-words text-sm text-slate-600">
              {activity.locationName}
            </p>
          ) : null}

          {activity.description ? (
            <p className="mt-2 max-w-prose wrap-break-words text-sm leading-6 text-slate-600">
              {activity.description}
            </p>
          ) : null}
        </div>

        {canEditActivities ? (
          <DeleteActivityAction
            activityId={activity.id}
            activityTitle={activity.title}
            isConfirming={isConfirming}
            isDisabled={
              hasTripDestinationConfirmationOpen ||
              hasAnotherActivityConfirmation
            }
            onCloseConfirmation={onCloseActivityConfirmation}
            onOpenConfirmation={() =>
              onOpenActivityConfirmation(activity.id)
            }
            tripId={tripId}
          />
        ) : null}
      </li>
    );
  };

  return (
    <div className="space-y-4">
      {activityDayGroups.map(({ dayKey, activities: dayActivities }) => {
        const dayLabel =
          dayKey === null ? null : formatActivityDayLabel(dayKey);

        return (
          <div key={dayKey ?? "unknown-time-zone"}>
            {dayLabel ? (
              <div className="mb-1 flex items-center gap-3">
                <h4 className="shrink-0 text-sm font-semibold text-slate-700 first-letter:uppercase">
                  {dayLabel}
                </h4>
                <span
                  aria-hidden="true"
                  className="h-px min-w-6 flex-1 bg-slate-200"
                />
              </div>
            ) : null}

            <ul
              aria-label={dayLabel ? `${label}: ${dayLabel}` : label}
              className="divide-y divide-slate-200"
            >
              {dayActivities.map(renderActivity)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
