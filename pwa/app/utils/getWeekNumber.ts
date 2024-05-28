/**
 * ISO 8601-week number of the year
 * @param date
 */
export const getWeekNumber = (date: Date): number => {
  // Create a copy of the date object
  const target = new Date(date.valueOf());

  // ISO week date weeks start on Monday, so correct the day numbers
  const dayNr = (date.getDay() + 6) % 7;

  // Set the target to the Thursday of this week, so the
  // target year is the year of this week
  target.setDate(target.getDate() - dayNr + 3);

  // ISO 8601 states that week 1 is the week
  // with the first Thursday of that year.
  const firstThursday = target.valueOf();

  // Set the target to the first Thursday of the year
  // First set the target to January 1st
  target.setMonth(0, 1);
  // Not a Thursday? Correct the date to the next Thursday
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }

  // The week-number is the number of weeks between the
  // first Thursday of the year and the Thursday in the target week.
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000); // 604800000 = number of milliseconds in a week
};
