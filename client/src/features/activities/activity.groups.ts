import { getActivityDayKey } from "./activity.formatters";
import type { Activity } from "./activity.types";

export type ActivityDayGroup = {
  dayKey: string;
  activities: Activity[];
};

export function groupActivitiesByLocalDay(
  activities: Activity[],
  timeZone: string,
): ActivityDayGroup[] {
  const activitiesByDay = new Map<string, Activity[]>();
  const sortedActivities = [...activities].sort(
    (firstActivity, secondActivity) =>
      new Date(firstActivity.startsAt).getTime() -
      new Date(secondActivity.startsAt).getTime(),
  );

  for (const activity of sortedActivities) {
    const dayKey = getActivityDayKey(activity.startsAt, timeZone);
    const dayActivities = activitiesByDay.get(dayKey) ?? [];

    dayActivities.push(activity);
    activitiesByDay.set(dayKey, dayActivities);
  }

  return Array.from(
    activitiesByDay,
    ([dayKey, dayActivities]): ActivityDayGroup => ({
      dayKey,
      activities: dayActivities,
    }),
  );
}
