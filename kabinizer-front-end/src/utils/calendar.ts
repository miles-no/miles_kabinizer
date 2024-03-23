import { MonthMapType, Option, WeekMapType } from "@/types";
import { CreateBookingRequestDto, Draw, Period } from "api";
import { GetNextSunday, GetPreviousMonday, GetWeeksNum } from ".";

// Get the day of the week, but start monday at 1
const getDayOfWeek = (date: Date) => (date.getDay() === 0 ? 7 : date.getDay());

/**
 * Turn list of periods into a list of weeks
 * @param periods
 * @param draws
 * @returns Option[]
 *
 * Only supports periods that do not span over more than 2 weeks
 */
export const GetWeeklyPeriods = (periods: Period[], draws: Draw[]) => {
  return periods.reduce<Option[]>((acc, cur) => {
    const startDate = new Date(cur.periodStart ?? "");
    const endDate = new Date(cur.periodEnd ?? "");
    // Check if we are we within the same week
    if (GetWeeksNum(startDate) === GetWeeksNum(endDate)) {
      const weekDates = `${startDate.getDate()}-${endDate.getDate()}`;
      acc.push({
        id: cur.id,
        start: getDayOfWeek(startDate),
        end: getDayOfWeek(endDate),
        week: GetWeeksNum(startDate),
        month: startDate.getMonth(),
        label: cur.title ? `${cur.title} (${weekDates})` : weekDates,
        from: startDate,
        to: endDate,
        isSpecial:
          draws.find((draw) => draw.id === cur.drawId)?.isSpecial ?? false,
      });
    } else {
      // We have a period that breaks a week
      acc.push(
        {
          id: cur.id,
          start: getDayOfWeek(startDate),
          end: 7,
          week: GetWeeksNum(startDate),
          month: startDate.getMonth(),
          label: cur.title ?? "",
          from: startDate,
          to: GetNextSunday(startDate),
          isSpecial:
            draws.find((draw) => draw.id === cur.drawId)?.isSpecial ?? false,
        },
        {
          id: cur.id,
          start: 1,
          end: getDayOfWeek(endDate),
          week: GetWeeksNum(endDate),
          month: startDate.getMonth(),
          label: cur.title ?? "",
          from: GetPreviousMonday(endDate),
          to: endDate,
          isSpecial:
            draws.find((draw) => draw.id === cur.drawId)?.isSpecial ?? false,
        },
      );
    }

    return acc;
  }, []);
};

export const getWeekMap = (data: Option[]): WeekMapType =>
  data.reduce<{ [key: number]: Option[] }>((acc, cur) => {
    if (!acc[cur.week]) {
      acc[cur.week] = [];
    }
    acc[cur.week].push(cur);
    return acc;
  }, {});

export const getWeeksMap = (data: Option[]): WeekMapType => {
  const firstWeek = data[0].week;
  const lastWeek = data[data.length - 1].week;
  const numberOfWeeks = lastWeek - firstWeek + 1;
  const weeksMap: WeekMapType = {};

  for (let i = 0; i < numberOfWeeks; i++) {
    const week = firstWeek + i;
    weeksMap[week] = data.filter((d) => d.week === week);
  }

  return weeksMap;
};

export const getMonthMap = (weekMap: WeekMapType): MonthMapType =>
  Object.entries(weekMap).reduce<MonthMapType>((acc, [week, options]) => {
    const month = options[0].month;
    if (!acc[month]) {
      acc[month] = {};
    }
    acc[month][Number(week)] = options;
    return acc;
  }, {});

export const getMonthsMap = (data: Option[]): MonthMapType => {
  const firstMonth = data[0].month;
  const lastMonth = data[data.length - 1].month;
  const numberOfMonths = lastMonth - firstMonth + 1;
  const monthsMap: MonthMapType = {};

  for (let i = 0; i < numberOfMonths; i++) {
    const month = firstMonth + i;
    monthsMap[month] = {};
  }

  const weeksMap = getWeeksMap(data);

  for (const week in weeksMap) {
    const month = weeksMap[week][0].month;
    if (!monthsMap[month]) {
      monthsMap[month] = {};
    }
    monthsMap[month][Number(week)] = weeksMap[week];
  }

  return monthsMap;
};

export const getAllBookingRequests = (data: Draw[]) =>
  data.reduce<CreateBookingRequestDto[]>((acc, cur) => {
    if (cur.periods) {
      const bookingRequests = cur.periods.map((p) => ({
        periodId: p.id ?? "",
      }));

      acc.push(...bookingRequests);
    }
    return acc;
  }, []);
