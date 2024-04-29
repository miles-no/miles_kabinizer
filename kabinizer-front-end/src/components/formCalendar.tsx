import React, { useState } from "react";

const getNorwegianWeekNumber = (date: Date): number => {
  const year = date.getFullYear();
  const firstThursday = new Date(year, 0, 1);
  while (firstThursday.getDay() !== 4)
    firstThursday.setDate(firstThursday.getDate() + 1);
  const weekStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  while (weekStart.getDay() !== 1) weekStart.setDate(weekStart.getDate() - 1);
  const weeksSinceFirstThursday = Math.ceil(
    (weekStart.getTime() - firstThursday.getTime()) / 604800000,
  );
  return weeksSinceFirstThursday + 1;
};

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfWeek = (month: number, year: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

interface FormCalendarProps {
  year: number;
}

export const FormCalendar: React.FC<FormCalendarProps> = ({ year }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" }),
  );
  const [selectedWeeks, setSelectedWeeks] = useState<Set<number>>(new Set());

  const handleWeekSelect = (week: number, isSelected: boolean) => {
    const newSelectedWeeks = new Set(selectedWeeks);
    isSelected ? newSelectedWeeks.add(week) : newSelectedWeeks.delete(week);
    setSelectedWeeks(newSelectedWeeks);
  };

  return (
    <>
      <input type="hidden" name="year" value={year} />
      {months.map((month, index) => {
        const daysInMonth = getDaysInMonth(index, year);
        const firstDayOfWeek = getFirstDayOfWeek(index, year);
        const weeks: (number | null)[][] = [];
        let currentWeek: (number | null)[] = Array(firstDayOfWeek).fill(null);
        for (let day = 1; day <= daysInMonth; day++) {
          currentWeek.push(day);
          if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
          }
        }
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) currentWeek.push(null);
          weeks.push(currentWeek);
        }
        return (
          <details key={index} className="cursor-pointer rounded bg-white">
            <summary className="p-4 text-xl text-miles-red-900">
              {month}
            </summary>
            <div className="flex flex-col gap-2 overflow-auto p-4">
              <TableHeader />
              {weeks.map((week, weekIndex) => {
                const weekStartDate = new Date(year, index, weekIndex * 7 + 1);
                const weekNumber = getNorwegianWeekNumber(weekStartDate);

                return (
                  <WeekRow
                    key={weekIndex}
                    status="Ledig"
                    week={weekNumber}
                    days={week}
                    selected={selectedWeeks.has(weekNumber)}
                    onWeekSelect={handleWeekSelect}
                  />
                );
              })}
            </div>
          </details>
        );
      })}
    </>
  );
};

export const TableHeader: React.FC = () => (
  <div className="grid grid-cols-12 border-2 border-transparent pl-2 pr-2 text-center">
    <p className="col-span-2 truncate text-start font-bold text-miles-red-900">
      Status
    </p>
    <p className="col-span-2 text-center font-bold text-miles-red-900">Uke</p>
    {["M", "T", "W", "T", "F", "S", "S"].map((dayLabel, index) => (
      <p key={index}>{dayLabel}</p>
    ))}
    <p className="text-end">Valgt</p>
  </div>
);

interface WeekRowProps {
  status: string;
  week: number;
  days: (number | null)[];
  disabled?: boolean;
  selected?: boolean;
  onWeekSelect?: (week: number, selected: boolean) => void;
}

export const WeekRow: React.FC<WeekRowProps> = ({
  status,
  week,
  days,
  disabled,
  selected,
  onWeekSelect,
}) => (
  <label className="grid h-10 cursor-pointer grid-cols-12 items-center rounded-xl border-2 border-transparent pl-2 pr-2 checked:border-miles-red-500">
    <p className="col-span-2 truncate text-start text-miles-red-900">
      {status}
    </p>
    <p className="col-span-2 text-center text-miles-red-900">{week}</p>
    {days.map((day, index) => (
      <p className="text-center" key={index}>
        {day ? day.toString() : ""}
      </p>
    ))}
    <div className=" flex justify-end">
      <input
        name={`week-${week}`}
        type="checkbox"
        checked={selected}
        onChange={(event) =>
          onWeekSelect && onWeekSelect(week, event.target.checked)
        }
        className="checkbox-primary checkbox"
        disabled={disabled}
      />
    </div>
  </label>
);
