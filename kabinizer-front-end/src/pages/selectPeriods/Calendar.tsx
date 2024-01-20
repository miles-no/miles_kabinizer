import { CreateBookingRequestDto, Draw, Period } from "../../../api";
import DateRangeOption from "../../components/DateRangeOption";
import MonthColumn from "../../components/MonthVertical";
import WeekNumber from "../../components/WeekNumber";
import { MonthMapType, Option, WeekMapType } from "../../types";
import {
  CompareDates,
  GetNextSunday,
  GetPreviousMonday,
  GetWeeksNum,
} from "../../utils";
import { COLORS, MONTHS } from "../../options";
import Hump from "./Hump";

const getWeeklyPeriods = (periods: Period[], draws: Draw[]) => {
  return periods.reduce<Option[]>((acc, cur) => {
    const startDate = new Date(cur.periodStart ?? "");
    const endDate = new Date(cur.periodEnd ?? "");
    // Check if we are we within the same week
    if (GetWeeksNum(startDate) === GetWeeksNum(endDate)) {
      const weekDates = `${startDate.getDate()}-${endDate.getDate()}`;
      acc.push({
        id: cur.id,
        start: startDate.getDay() - 1, // 0 is monday
        end: (endDate.getDay() + 6) % 7, // 6 is sunday
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
          start: startDate.getDay() - 1,
          end: 6,
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
          start: 0,
          end: (endDate.getDay() + 6) % 7,
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

const Calendar = ({
  draws,
  selected,
  setSelected,
}: {
  draws: Draw[];
  selected: CreateBookingRequestDto[];
  setSelected: (selected: CreateBookingRequestDto[]) => void;
}) => {
  const periods = draws
    .map((value) => value.periods ?? [])
    .flat()
    .sort((a, b) => {
      return CompareDates(a, b);
    });

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
            periodId: period.id ?? "",
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
            color={COLORS[Number(month) % COLORS.length].selected}
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

export default Calendar;
