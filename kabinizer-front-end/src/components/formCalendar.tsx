import { getWeekNumber } from "@/utils/getWeekNumber.ts";
import { WeekHeader } from "@/components/WeekHeader.tsx";
import { WeekRow } from "@/components/weekRow.tsx";
import { generateMonthWeeks } from "@/utils/generateMonthWeeks.ts";
import { monthNames } from "@/utils/monthNames.ts";
import useToggleSelection from "../../hooks/useToggleSelection.tsx";

export const FormCalendar = (props: { year: number }) => {
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
                {weeks.map((week, weekIndex) => {
                  const weekStartDate = new Date(
                    props.year,
                    monthIndex,
                    weekIndex * 7 + 1,
                  );
                  const weekNumber = getWeekNumber(weekStartDate);

                  return (
                    <WeekRow
                      name={`${props.year}/${monthIndex + 1}-week#${weekNumber}`}
                      key={weekIndex}
                      status="Ledig"
                      week={weekNumber}
                      days={week}
                      selected={selectedWeeks.some((selectedWeek) => {
                        if (
                          monthIndex === 0 &&
                          (weekNumber === 52 || weekNumber === 53)
                        ) {
                          return (
                            selectedWeek.id ===
                            `${weekNumber}-${props.year - 1}`
                          );
                        } else {
                          return (
                            selectedWeek.id === `${weekNumber}-${props.year}`
                          );
                        }
                      })}
                      onWeekSelect={(isSelected) => {
                        if (
                          monthIndex === 0 &&
                          (weekNumber === 52 || weekNumber === 53)
                        ) {
                          updateSelectionState(
                            `${weekNumber}-${props.year - 1}`,
                            isSelected,
                          );
                          return;
                        } else {
                          updateSelectionState(
                            `${weekNumber}-${props.year}`,
                            isSelected,
                          );
                        }
                      }}
                    />
                  );
                })}
              </div>
            </details>
          );
        }
      })}
    </>
  );
};
