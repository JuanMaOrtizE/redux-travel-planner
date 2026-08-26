import {
  formatActivityDateTime,
  getActivityStatusLabel,
} from "./activity.formatters";
import type { Activity } from "./activity.types";

type ActivityGroupListProps = {
  activities: Activity[];
  emptyMessage: string;
  label: string;
  timeZone: string | null;
};

export default function ActivityGroupList({
  activities,
  emptyMessage,
  label,
  timeZone,
}: ActivityGroupListProps) {
  if (activities.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <ul aria-label={label} className="divide-y divide-slate-200">
      {activities.map((activity) => {
        const startsAtLabel =
          timeZone === null
            ? null
            : formatActivityDateTime(activity.startsAt, timeZone);
        const endsAtLabel =
          timeZone === null || activity.endsAt === null
            ? null
            : formatActivityDateTime(activity.endsAt, timeZone);

        return (
          <li className="py-3 first:pt-0 last:pb-0" key={activity.id}>
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
              <p className="mt-2 text-sm text-slate-500">
                Horario pendiente
              </p>
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
          </li>
        );
      })}
    </ul>
  );
}
