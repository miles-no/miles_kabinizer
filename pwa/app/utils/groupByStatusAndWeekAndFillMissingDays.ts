import { splitDaysByStatusOrWeek } from "~/utils/splitDaysByStatusOrWeek";
import { fillWeekDays } from "~/utils/fillWeekDays";

export type Status = "Available" | "Selected" | "Assigned" | "Busy" | "Fill";

export interface DayStatus {
  date: Date;
  status: Status;
}

export interface DayGroup {
  sortIndex: number; // unix timestamp
  week: number;
  status: Status;
  days: DayStatus[];
}

/**
 * Groups the days by status and week, and fills in missing days with Fill
 * @param days
 */
export const groupByStatusAndWeekAndFillMissingDays = (
  days: DayStatus[],
): DayGroup[] => {
  const filled = fillWeekDays(days);
  const dayGroups = splitDaysByStatusOrWeek(filled);
  return dayGroups.sort((a, b) => a.sortIndex - b.sortIndex);
};
