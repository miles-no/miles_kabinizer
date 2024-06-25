import { groupDaysByWeekNumber } from "~/utils/groupDaysByWeekNumber";
import { getDaysInPeriod } from "~/utils/getDaysInPeriod";

// Todo: but why? Not sure if this is needed

/**
 * Groups days by week number and checks if they are in the period
 * @param from Start of the period
 * @param to End of the period
 */
export const groupDaysAndCheckExistence = (from: Date, to: Date) => {
  const days = getDaysInPeriod(from, to);
  const groupedByWeek = groupDaysByWeekNumber(days);

  return Object.entries(groupedByWeek).map(([weekNumber, daysInWeek]) => {
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const isInPeriod = daysInWeek.some((day) => day.getDay() === i);
      return { dayIndex: i, isInPeriod };
    });

    return { weekNumber, weekDays };
  });
};
