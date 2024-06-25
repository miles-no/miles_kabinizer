import { OutputDate } from "~/utils/fillWeekDays.test";

export const fillOneWeek = (days: Array<OutputDate>) => {
  const filledDays: OutputDate[] = [];

  // Find the earliest date in the provided days
  const firstDayOfWeek = days.length > 0 ? days[0].date : new Date();
  const dayOfWeek = firstDayOfWeek.getDay();
  const startOfWeek = new Date(firstDayOfWeek);
  startOfWeek.setDate(
    firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1),
  ); // Adjust to start from Monday
  startOfWeek.setHours(0, 0, 0, 0); // Normalize to midnight

  // Create a map of dates from the input array for quick lookup
  const dateMap = new Map(
    days.map((day) => [new Date(day.date).setHours(0, 0, 0, 0), day]),
  );

  // Fill days from Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    currentDate.setHours(0, 0, 0, 0); // Normalize to midnight

    // Check if the current date exists in the input days
    const foundDay = dateMap.get(currentDate.getTime());

    if (foundDay) {
      filledDays.push(foundDay);
    } else {
      filledDays.push({ date: currentDate, status: "Fill" });
    }
  }

  return filledDays;
};
