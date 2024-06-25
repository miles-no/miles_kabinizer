import { DayGroup } from "~/utils/groupByStatusAndWeekAndFillMissingDays";

export interface GroupedByWeek {
  weekNumber: number;
  groupedDays: DayGroup[];
}

/**
 * Groups the days by week number
 * nb: does not handle multiple years. So please only call this one month at a time.
 * @param dayGroups
 */
export const groupDayGroupsByWeek = (
  dayGroups: DayGroup[],
): GroupedByWeek[] => {
  const groupedByWeek: GroupedByWeek[] = [];
  for (const dayGroup of dayGroups) {
    const weekNumber = dayGroup.week;
    if (!groupedByWeek[weekNumber]) {
      groupedByWeek[weekNumber] = { weekNumber, groupedDays: [] };
    }
    groupedByWeek[weekNumber].groupedDays.push(dayGroup);
  }
  return groupedByWeek
    .filter((g) => !!g) // remove nulls
    .sort((a, b) => a.groupedDays[0].sortIndex - b.groupedDays[0].sortIndex);
};
