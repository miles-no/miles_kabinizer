import { generateMonthWeeks } from "@/utils/generateMonthWeeks.ts";
import useToggleSelection from "../../hooks/useToggleSelection.tsx";
import { monthNames } from "@/utils/monthNames.ts";
import { WeekHeader } from "@/components/WeekHeader.tsx";
import { WeekRows } from "@/components/WeekRows.tsx";
import React from "react";

/**
 * FormCalendar component.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {number} props.year - The year for which the calendar is being displayed.
 *
 * @returns {React.ReactElement} A fragment containing a details element for each month of the year.
 */
export const FormCalendar = (props: { year: number }): React.ReactElement => {
  const { selectedItems: selectedWeeks, updateSelectionState } =
    useToggleSelection();

  return (
    <>
      {Array.from({ length: 12 }, (_, monthIndex) => {
        {
          const weeks = generateMonthWeeks(monthIndex, props.year);

          return (
            <details
              key={monthIndex}
              className="cursor-pointer rounded bg-white"
            >
              <summary className="p-4 text-xl text-miles-red-900">
                {monthNames[monthIndex]}
              </summary>
              <div className="flex flex-col gap-2 overflow-auto p-4">
                <WeekHeader />
                <WeekRows
                  year={props.year}
                  monthIndex={monthIndex}
                  selectedWeeks={selectedWeeks}
                  updateSelectionState={updateSelectionState}
                  weeks={weeks}
                />
              </div>
            </details>
          );
        }
      })}
    </>
  );
};
