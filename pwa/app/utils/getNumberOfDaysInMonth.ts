/**
 * Get the number of days in a month
 * @param month
 * @param year
 */
export const getNumberOfDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();
