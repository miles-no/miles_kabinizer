import { groupByWeek } from "~/utils/groupByWeek";
import { getWeekNumber } from "~/utils/getWeekNumber";
import { DayStatus, DayGroup } from "~/utils/splitDaysByStatusOrWeek.test";

export function splitDaysByStatusOrWeek(days: DayStatus[]): DayGroup[] {
  const result: DayGroup[] = [];
  const byWeek = groupByWeek(days);
  for (const weekNumber in byWeek) {
    const weekDays = byWeek[weekNumber].sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );

    let lastStatus = "";
    let partialResult: DayStatus[] = [];
    weekDays.forEach((day) => {
      if (lastStatus !== day.status) {
        if (partialResult.length > 0) {
          result.push({
            sortIndex: partialResult[0].date.getTime(),
            week: getWeekNumber(partialResult[0].date),
            status: partialResult[0].status,
            days: partialResult,
          });
        }
        partialResult = [];
        lastStatus = day.status;
      }
      partialResult.push(day);
    });
    result.push({
      sortIndex: partialResult[0].date.getTime(),
      week: getWeekNumber(partialResult[0].date),
      status: partialResult[0].status,
      days: partialResult,
    });
  }
  return result;
}
