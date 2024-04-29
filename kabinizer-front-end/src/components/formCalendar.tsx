import React, { useState } from "react";
import { getWeekNumber } from "@/utils/getWeekNumber.ts";
import { WeekHeader } from "@/components/WeekHeader.tsx";
import { WeekRow } from "@/components/weekRow.tsx";
import { generateMonthWeeks } from "@/utils/generateMonthWeeks.ts";

type FormCalendarProps = {
  year: number;
};

export const FormCalendar: React.FC<FormCalendarProps> = ({ year }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" }),
  );

  const [selectedWeeks, setSelectedWeeks] = useState(new Set());

  const handleWeekSelect = (weekNumber: number, isSelected: boolean) => {
    const updatedWeeks = new Set(selectedWeeks);
    if (isSelected) {
      updatedWeeks.add(weekNumber);
    } else {
      updatedWeeks.delete(weekNumber);
    }
    setSelectedWeeks(updatedWeeks);
  };

  return (
    <>
      <input type="hidden" name="year" value={year} />
      {months.map((month, monthIndex) => {
        const weeks = generateMonthWeeks(monthIndex, year);

        return (
          <details key={monthIndex} className="cursor-pointer rounded bg-white">
            <summary className="p-4 text-xl text-miles-red-900">
              {month}
            </summary>
            <div className="flex flex-col gap-2 overflow-auto p-4">
              <WeekHeader />
              {weeks.map((week, weekIndex) => {
                const weekStartDate = new Date(
                  year,
                  monthIndex,
                  weekIndex * 7 + 1,
                );
                const weekNumber = getWeekNumber(weekStartDate);

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
