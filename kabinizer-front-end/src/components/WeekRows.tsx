import { getWeekNumber } from "@/utils/getWeekNumber.ts";
import { WeekRow } from "@/components/WeekRow.tsx";
import React from "react";
import { Weeks } from "@/utils/createWeeksForMonth.ts";

/**
 * WeekRows component.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {number} props.year - The year for which the weeks are being displayed.
 * @param {number} props.monthIndex - The index of the month for which the weeks are being displayed.
 * @param {Array} props.selectedWeeks - An array of objects, each containing an id of a selected week.
 * @param {Function} props.updateSelectionState - A function to update the selection state of a week.
 * @param {Weeks} props.weeks - A 2D array representing the weeks of a month and the days in each week.
 *
 * @returns {React.ReactElement} A fragment containing a WeekRow component for each week in the weeks array.
 */
export const WeekRows = (props: {
  year: number;
  monthIndex: number;
  selectedWeeks: { id: string }[];
  updateSelectionState: (id: string, isSelected: boolean) => void;
  weeks: Weeks;
}): React.ReactElement => {
  const { year, monthIndex, selectedWeeks, updateSelectionState, weeks } =
    props;

  return (
    <>
      {weeks.map((week, weekIndex) => {
        const weekStartDate = new Date(year, monthIndex, weekIndex * 7 + 1);
        const weekNumber = getWeekNumber(weekStartDate);

        const isSelectedWeek = selectedWeeks.some((selectedWeek) => {
          const selectedWeekId =
            monthIndex === 0 && (weekNumber === 52 || weekNumber === 53)
              ? `${weekNumber}-${year - 1}`
              : `${weekNumber}-${year}`;
          return selectedWeek.id === selectedWeekId;
        });

        const handleWeekSelect = (isSelected: boolean) => {
          const selectedWeekId =
            monthIndex === 0 && (weekNumber === 52 || weekNumber === 53)
              ? `${weekNumber}-${year - 1}`
              : `${weekNumber}-${year}`;
          updateSelectionState(selectedWeekId, isSelected);
        };

        return (
          <WeekRow
            name={`${year}/${monthIndex + 1}-week#${weekNumber}`}
            key={weekIndex}
            status="Ledig"
            week={weekNumber}
            days={week}
            selected={isSelectedWeek}
            onWeekSelect={handleWeekSelect}
          />
        );
      })}
    </>
  );
};
