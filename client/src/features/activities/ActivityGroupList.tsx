import { getActivityStatusLabel } from "./activity.formatters";
import type { Activity } from "./activity.types";

type ActivityGroupListProps = {
  activities: Activity[];
  emptyMessage: string;
  label: string;
};

export default function ActivityGroupList({
  activities,
  emptyMessage,
  label,
}: ActivityGroupListProps) {
  if (activities.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <ul aria-label={label} className="divide-y divide-slate-200">
      {activities.map((activity) => (
        <li className="py-3 first:pt-0 last:pb-0" key={activity.id}>
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <p className="min-w-0 wrap-break-words font-semibold text-slate-900">
              {activity.title}
            </p>
            <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {getActivityStatusLabel(activity.status)}
            </span>
          </div>

          {activity.locationName ? (
            <p className="mt-1 wrap-break-words text-sm text-slate-600">
              {activity.locationName}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
