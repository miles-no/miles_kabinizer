export const getWeekNumber = (date: Date): number => {
  // Find the first Thursday of the current year
  const firstThursday = new Date(date.getFullYear(), 0, 1);
  while (firstThursday.getDay() !== 4) {
    firstThursday.setDate(firstThursday.getDate() + 1);
  }

  // Determine the start of the first week (Monday before the first Thursday)
  const firstWeekStart = new Date(firstThursday);
  firstWeekStart.setDate(firstWeekStart.getDate() - 3); // Move to Monday

  // Calculate the number of days from the first week start to the given date
  const daysDifference =
    (date.getTime() - firstWeekStart.getTime()) / (24 * 60 * 60 * 1000);

  // Calculate the number of weeks
  const weekNumber = Math.floor(daysDifference / 7) + 1;

  // Handle edge case: if the week number is less than 1, it's the last week of the previous year
  if (weekNumber < 1) {
    const lastDayOfPreviousYear = new Date(date.getFullYear() - 1, 11, 31);
    return getWeekNumber(lastDayOfPreviousYear);
  }

  return weekNumber;
};
