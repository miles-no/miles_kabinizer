import { BookingRequest, Draw, Period } from "../../../api";
import DateRangeOption from "../../components/DateRangeOption";
import MonthColumn from "../../components/MonthVertical";
import WeekNumber from "../../components/WeekNumber";
import { ColorType } from "../../types";

type Option = {
  id?: string;
  start: number;
  end: number;
  month: number;
  week: number;
  label: string;
  from: Date;
  to: Date;
  isSpecial: boolean;
};

type WeekMapType = Record<string, Option[]>;

type MonthMapType = Record<number, WeekMapType>;

const MONTHS: Record<number, string> = {
  0: "Januar",
  1: "Februar",
  2: "Mars",
  3: "April",
  4: "Mai",
  5: "Juni",
  6: "Juli",
  7: "August",
  8: "September",
  9: "Oktober",
  10: "November",
  11: "Desember",
};

const COLORS: Record<number, ColorType> = {
  0: {
    background: "#DDD4E9",
    primary: "#AB98C5",
    selected: "#5C447D",
    special: "#FE757D",
    specialSelected: "#ff303d",
  },
  1: {
    background: "#B8C5DC",
    primary: "#8497B8",
    selected: "#354A71",
    special: "#FE757D",
    specialSelected: "#ff303d",
  },
};

const getWeeksNum = (date: Date) => {
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

const getWeeklyPeriods = (periods: Period[], draws: Draw[]) => {
  return periods.reduce<Option[]>((acc, cur) => {
    const startDate = new Date(cur.periodStart ?? "");
    const endDate = new Date(cur.periodEnd ?? "");
    // Check if we are we within the same week
    if (getWeeksNum(startDate) === getWeeksNum(endDate)) {
      const weekDates = `${startDate.getDate()}-${endDate.getDate()}`;
      acc.push({
        id: cur.id,
        start: startDate.getDay() - 1, // 0 is monday
        end: (endDate.getDay() + 6) % 7, // 6 is sunday
        week: getWeeksNum(startDate),
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
          start: startDate.getDay() - 1,
          end: 6,
          week: getWeeksNum(startDate),
          month: startDate.getMonth(),
          label: cur.title ?? "",
          from: startDate,
          to: endDate,
          isSpecial:
            draws.find((draw) => draw.id === cur.drawId)?.isSpecial ?? false,
        },
        {
          id: cur.id,
          start: 0,
          end: (endDate.getDay() + 6) % 7,
          week: getWeeksNum(endDate),
          month: startDate.getMonth(),
          label: cur.title ?? "",
          from: startDate,
          to: endDate,
          isSpecial:
            draws.find((draw) => draw.id === cur.drawId)?.isSpecial ?? false,
        },
      );
    }

    return acc;
  }, []);
};

const Calendar = ({
  periods,
  draws,
  selected,
  setSelected,
}: {
  periods: Period[];
  draws: Draw[];
  selected: BookingRequest[];
  setSelected: (selected: BookingRequest[]) => void;
}) => {
  const onClick = (periodId: string) => {
    const checked = selected.find((s) => s.periodId === periodId);
    if (checked) {
      setSelected(selected.filter((s) => s.periodId !== periodId));
    } else {
      const period = periods.find((p) => p.id === periodId);
      if (period) {
        setSelected([
          ...selected,
          {
            periodId: periodId,
            userId: "1",
          },
        ]);
      }
    }
  };

  if (periods.length === 0) {
    return <div>No periods</div>;
  }

  const data = getWeeklyPeriods(periods, draws);

  const weekMap: WeekMapType = data.reduce<{ [key: number]: Option[] }>(
    (acc, cur) => {
      if (!acc[cur.week]) {
        acc[cur.week] = [];
      }
      acc[cur.week].push(cur);
      return acc;
    },
    {},
  );

  const monthMap: MonthMapType = Object.entries(weekMap).reduce<{
    [key: number]: { [key: number]: Option[] };
  }>((acc, [week, options]) => {
    const month = options[0].month;
    if (!acc[month]) {
      acc[month] = {};
    }
    acc[month][Number(week)] = options;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(monthMap).map(([month, weeks]) => (
        <div key={month} className="flex items-center gap-x-4">
          <MonthColumn
            month={MONTHS[Number(month)]}
            color={COLORS[Number(month) % 2].selected}
          />
          <div
            className="relative flex w-72 flex-col rounded-lg rounded-tr-none p-2"
            style={{ backgroundColor: COLORS[Number(month) % 2].background }}
          >
            <Hump
              month={Number(month)}
              monthMap={monthMap}
              color={COLORS[Number(month) % 2].background}
            />
            <div className="flex h-full flex-col gap-y-4">
              {Object.entries(weeks).map(([week, options]) => (
                <div key={week} className="flex w-full gap-x-4">
                  <WeekNumber value={Number(week)} />
                  <div className="flex w-full gap-x-[9px]">
                    {options.map((option) => (
                      <DateRangeOption
                        key={option.id}
                        colors={COLORS[Number(month) % 2]}
                        from={option.from}
                        to={option.to}
                        isSpecial={option.isSpecial}
                        selected={
                          !!selected.find((s) => s.periodId === option.id)
                        }
                        onClick={() => onClick(option.id ?? "")}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Hump = ({
  month,
  monthMap,
  color,
}: {
  month: number;
  monthMap: MonthMapType;
  color: string;
}) => {
  if (monthMap[month - 1] === undefined) return null;

  const currentMonth = monthMap[month]
    ? Object.entries(monthMap[month])[0]
    : undefined;

  if (currentMonth === undefined) return null;

  const daysCur = currentMonth[1][0].from.getDate();

  return (
    <div className="absolute -top-14 right-0 z-0 flex h-14 w-full pl-[34px]">
      <div style={{ minWidth: `${34.5 * daysCur}px` }} />
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-full rounded-tl-lg border-l-4 border-t-4 border-white pr-[8px]"
      />
    </div>
  );
};

export default Calendar;
