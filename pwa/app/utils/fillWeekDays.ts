import { groupByWeek } from "~/utils/groupByWeek";
import { fillOneWeek } from "~/utils/fillOneWeek";
import { OutputDate } from "~/utils/fillWeekDays.test";

export const fillWeekDays = (days: OutputDate[]): OutputDate[] => {
  const groupedByWeekNumber = groupByWeek(days);

  // If only one week, call fillOneWeek with the entire array
  // If multiple weeks, call fillOneWeek for each week and merge the results
  if (Object.keys(groupedByWeekNumber).length === 1) {
    return fillOneWeek(days);
  } else {
    const filledDays: OutputDate[] = [];
    for (const weekNumber in groupedByWeekNumber) {
      const weekDays = groupedByWeekNumber[weekNumber];
      filledDays.push(...fillOneWeek(weekDays));
    }
    return filledDays;
  }
};
