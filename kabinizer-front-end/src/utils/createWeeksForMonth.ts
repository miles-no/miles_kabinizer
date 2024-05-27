import { getFirstDayOfWeek } from "@/utils/getFirstDayOfWeek.ts";
import { getDaysInMonth } from "@/utils/getDaysInMonth.ts"; // Type representing a day of a week.

/**
 * Type representing a day of a week.
 */
export type Day = number | null;

/**
 * Type representing a week of a month.
 */
export type Week = Array<Day>;

/**
 * Type representing a 2D array where each inner array represents a week of a month.
 */
export type Weeks = Array<Week>;

/**
 * Get all the weeks for a given month and year.
 * @param {number} monthIndex - The index of the month (0 for January, 11 for December).
 * @param {number} year - The year.
 * @returns {Weeks} - A 2D array where each inner array represents a week of the month.
 */
export const createWeeksForMonth = (
  monthIndex: number,
  year: number,
): Weeks => {
  const weeks: Array<Array<number | null>> = [];
  let currentWeek: Array<number | null> = Array(
    getFirstDayOfWeek(monthIndex, year),
  ).fill(null);

  // Iterate over each day of the month
  for (let day = 1; day <= getDaysInMonth(monthIndex, year); day++) {
    currentWeek.push(day);
    // If the current week has 7 days, push it and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add the remaining days of the last week of the month, filling the rest of the week with nulls
  // Only push the last week if it contains any days of the current month
  if (currentWeek.length > 0) {
    weeks.push([...currentWeek, ...Array(7 - currentWeek.length).fill(null)]);
  }

  return weeks;
};
