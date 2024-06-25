import { getWeekNumber } from "~/utils/getWeekNumber";
import { OutputDate } from "~/utils/fillWeekDays.test";

export function groupByWeek(days: OutputDate[]) {
  const groupedByWeekNumber: { [key: number]: OutputDate[] } = {};
  for (let i = 0; i < days.length; i++) {
    const weekNumber = getWeekNumber(days[i].date);
    if (!groupedByWeekNumber[weekNumber]) {
      groupedByWeekNumber[weekNumber] = [];
    }
    groupedByWeekNumber[weekNumber].push(days[i]);
  }
  return groupedByWeekNumber;
}
