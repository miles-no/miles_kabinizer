import { Period } from "../../api";

const oneDay = 24 * 60 * 60 * 1000;

export const NumberOfDays = (from: Date, to: Date) => {
  return Math.round(Math.abs((from.getTime() - to.getTime()) / oneDay));
};

export const CompareDates = (a: Period, b: Period) => {
  const dateA = new Date(a.periodStart ?? "").getTime();
  const dateB = new Date(b.periodStart ?? "").getTime();
  return dateA === dateB ? 0 : dateA > dateB ? 1 : -1;
};

export const GetWeeksNum = (date: Date) => {
  // Copy date so don't modify original
  date = new Date(+date);
  // Set hours to 0 to take the time part out of the comparison
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
};

export const GetNextSunday = (date: Date) => {
  const day = date.getDay();
  const nextSunday = new Date(date);
  nextSunday.setDate(date.getDate() + (7 - day));
  return nextSunday;
};

export const GetPreviousMonday = (date: Date) => {
  const day = date.getDay();
  const previousMonday = new Date(date);
  previousMonday.setDate(date.getDate() - day + 1);
  return previousMonday;
};

export const FormatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
