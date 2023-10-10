import { Period } from "../../api";
import { Option, Week } from "../types";

const oneDay = 24 * 60 * 60 * 1000;

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isDateInBetweenDates = (date: Date, from: Date, to: Date) => {
  return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
};

export const isSpecialPeriod = (date: Date, periods: Period[]) => {
  return periods.some((period) => {
    const start = new Date(period.periodStart ?? "");
    const end = new Date(period.periodEnd ?? "");
    return (
      date.getTime() >= start.getTime() &&
      date.getTime() <= end.getTime() &&
      period.isSpecialPeriod
    );
  });
};

export const getWeeks = (start: Date, end: Date): Week[] => {
  const weeks: Week[] = [];

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / oneDay);
  const numberOfWeeks = Math.ceil(diffDays / 7);

  let from = new Date(start.getTime());
  for (let i = 0; i < numberOfWeeks; i++) {
    const to = getEndOfWeek(from);
    weeks.push({
      from,
      to,
    });
    from = new Date(to.getTime() + oneDay);
  }

  return weeks;
};

// Get the sunday of the week
export const getEndOfWeek = (date: Date) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = copy.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(copy.setDate(diff + 6));
};

export const getOptions = (periods: Period[]): Option[] => {
  const options: Option[] = [];

  periods.forEach((period, index) => {
    if (period.isSpecialPeriod) {
      const wasHalfDay = periods[index - 1]?.periodEnd === period.periodStart;
      const isHalfDay = periods[index + 1]?.periodStart === period.periodEnd;
      options.push({
        from: new Date(
          new Date(period.periodStart ?? "").getTime() +
            (wasHalfDay ? oneDay : 0)
        ),
        to: new Date(period.periodEnd ?? ""),
        deadline: new Date(period.deadlineDate ?? ""),
        isSpecialPeriod: period.isSpecialPeriod,
        title: period.title,
        halfDay: isHalfDay,
      });
    } else {
      const start = new Date(period.periodStart ?? "");
      const end = new Date(period.periodEnd ?? "");
      const weeks = getWeeks(start, end);
      weeks.forEach((week) => {
        options.push({
          from: week.from,
          to: week.to,
          deadline: new Date(period.deadlineDate ?? ""),
          isSpecialPeriod: period.isSpecialPeriod,
          title: period.title,
        });
      });
    }
  });

  return options;
};

export const numberOfDays = (from: Date, to: Date) => {
  return Math.round(Math.abs((from.getTime() - to.getTime()) / oneDay));
};

export const getDays = (from: Date, to: Date) => {
  const days: Date[] = [];
  const numDays = numberOfDays(from, to);

  for (let i = 0; i <= numDays; i++) {
    const date = new Date(from.getTime() + i * oneDay);
    days.push(date);
  }

  return days;
};
