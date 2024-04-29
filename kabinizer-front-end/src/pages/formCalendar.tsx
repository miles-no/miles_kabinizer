import React from "react"; // Import React in TypeScript

// Helper function to get the Norwegian (ISO 8601) week number
const getNorwegianWeekNumber = (date: Date): number => {
  const year = date.getFullYear();
  const firstThursday = new Date(year, 0, 1);

  // Adjust to find the first Thursday of the year
  while (firstThursday.getDay() !== 4) {
    firstThursday.setDate(firstThursday.getDate() + 1);
  }

  // Determine the start of the current week (Monday)
  const weekStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  while (weekStart.getDay() !== 1) {
    weekStart.setDate(weekStart.getDate() - 1);
  }

  // Calculate the difference in weeks between the first Thursday and the current week's Monday
  const weeksSinceFirstThursday = Math.ceil(
    (weekStart.getTime() - firstThursday.getTime()) / 604800000,
  );

  // Week numbers are indexed from 1, so add 1 to the calculated difference
  return weeksSinceFirstThursday + 1;
};

interface FormCalendarProps {
  year: number;
}

export const FormCalendar: React.FC<FormCalendarProps> = ({ year }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" }),
  );

  return (
    <>
      <input type="hidden" name="year" value={year} />
      {months.map((month, index) => {
        const daysInMonth = getDaysInMonth(index, year);
        const firstDayOfWeek = getFirstDayOfWeek(index, year);

        const weeks: (number | null)[][] = [];
        let currentWeek: (number | null)[] = [];

        // Pad the first week with nulls if the month doesn't start on Monday
        for (let i = 0; i < firstDayOfWeek; i++) {
          currentWeek.push(null); // Pad to align the first week to Monday
        }

        // Fill the weeks with the correct days of the month
        for (let day = 1; day <= daysInMonth; day++) {
          currentWeek.push(day);
          if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
          }
        }

        // Pad the last week to ensure it has seven days
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) {
            currentWeek.push(null);
          }
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

export const TableHeader: React.FC = () => {
  return (
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
};

interface WeekRowProps {
  status: string;
  week: number;
  days: (number | null)[];
  defaultChecked?: boolean;
  disabled?: boolean;
}

export const WeekRow: React.FC<WeekRowProps> = ({
  status,
  week,
  days,
  defaultChecked,
  disabled,
}) => {
  return (
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
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="checkbox-primary checkbox"
        />
      </div>
    </label>
  );
};

// Helper function to get the number of days in a month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the starting day of the week for a given month and year (adjusted for Monday start)
const getFirstDayOfWeek = (month: number, year: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Adjust to start on Monday
};
