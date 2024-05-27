import { bench } from "vitest";
import { createWeeksForMonth } from "@/utils/createWeeksForMonth.ts";

bench("Generate weeks for each month from 2024 to 2030", () => {
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    createWeeksForMonth(monthIndex, 2024);
    createWeeksForMonth(monthIndex, 2025);
    createWeeksForMonth(monthIndex, 2026);
    createWeeksForMonth(monthIndex, 2027);
    createWeeksForMonth(monthIndex, 2028);
    createWeeksForMonth(monthIndex, 2029);
    createWeeksForMonth(monthIndex, 2030);
  }
});
