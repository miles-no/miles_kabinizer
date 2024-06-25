import { getWeekNumber } from "~/utils/getWeekNumber";

/**
 * Group days by week number.
 * @param days
 */
export function groupDaysByWeekNumber(days: Date[]): WeekDictionary {
  const weeks: { [key: number]: Date[] } = {};
  for (const day of days) {
    const weekNumber = getWeekNumber(day);
    if (!weeks[weekNumber]) {
      weeks[weekNumber] = [];
    }
    weeks[weekNumber].push(day);
  }
  return weeks;
}

export type WeekDictionary = { [key: number]: Date[] };
