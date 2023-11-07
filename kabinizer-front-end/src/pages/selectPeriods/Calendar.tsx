import { Period } from "../../../api";

type asd = {
  id?: string;
  start: number;
  end: number;
  week: number;
  label: string;
};

const getWeeksNum = (date: Date) => {
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

const Calendar = ({ periods }: { periods: Period[] }) => {
  const data = periods.reduce<asd[]>((acc, cur) => {
    const startDate = new Date(cur.periodStart ?? "");
    const endDate = new Date(cur.periodEnd ?? "");
    // Check if we are we within the same week
    if (getWeeksNum(startDate) == getWeeksNum(endDate)) {
      const weekDates = `${startDate.getDate()}-${endDate.getDate()}`;
      acc.push({
        id: cur.id,
        start: startDate.getDay() - 1,
        end: (endDate.getDay() + 6) % 7,
        week: getWeeksNum(startDate),
        label: cur.title ? `${cur.title} (${weekDates})` : weekDates,
      });
    } else {
      // We have a period that breaks a week
      acc.push(
        {
          id: cur.id,
          start: startDate.getDay() - 1,
          end: 6,
          week: getWeeksNum(startDate),
          label: cur.title ?? "",
        },
        {
          id: cur.id,
          start: 0,
          end: (endDate.getDay() + 6) % 7,
          week: getWeeksNum(endDate),
          label: cur.title ?? "",
        },
      );
    }

    return acc;
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default Calendar;
