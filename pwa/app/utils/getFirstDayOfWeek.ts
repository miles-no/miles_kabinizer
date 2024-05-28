/**
 * Get the first day of the week for a given month and year.
 * @param month
 * @param year
 */
export const getFirstDayOfWeek = (month: number, year: number) =>
  (new Date(year, month, 1).getDay() + 6) % 7;
