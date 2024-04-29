import { getFirstDayOfWeek } from "@/utils/getFirstDayOfWeek.ts";
import { getDaysInMonth } from "@/utils/getDaysInMonth.ts";

/**
 * Generates a 2D array representing the weeks of a given month and year.
 * Each week is an array of days, where each day is represented by a number (1-31) or null for days outside of the month.
 * The first day of the week is determined by the `getFirstDayOfWeek` function.
 * The number of days in the month is determined by the `getDaysInMonth` function.
 *
 * @param {number} monthIndex - The zero-based index of the month (0 for January, 11 for December).
 * @param {number} year - The year.
 * @returns {Array<Array<number | null>>} - A 2D array where each inner array represents a week of the month.
 */
export const generateMonthWeeks = (
  monthIndex: number,
  year: number,
): Array<Array<number | null>> => {
  const weeks: Array<Array<number | null>> = [];
  let currentWeek: Array<number | null> = Array(
    getFirstDayOfWeek(monthIndex, year),
  ).fill(null);

  // Iterate over each day of the month
  for (let day = 1; day <= getDaysInMonth(monthIndex, year); day++) {
    currentWeek.push(day);
    // If the current week has 7 days, add it to the weeks array and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add the remaining days of the last week of the month, filling the rest of the week with nulls
  weeks.push([...currentWeek, ...Array(7 - currentWeek.length).fill(null)]);

  return weeks;
};
