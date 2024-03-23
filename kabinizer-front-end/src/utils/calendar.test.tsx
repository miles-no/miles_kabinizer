import { expect, test } from "vitest";

import { GetWeeklyPeriods } from "./calendar";
import { Period } from "api";

type GetWeeklyPeriodsTestCase = {
  periods: Period[];
};

const testCases: GetWeeklyPeriodsTestCase[] = [
  {
    // Simple 2 week period that starts on a Monday
    periods: [
      {
        id: "1",
        periodStart: "2024-01-01",
        periodEnd: "2024-01-07",
        title: "Week 1",
      },
      {
        id: "2",
        periodStart: "2024-01-08",
        periodEnd: "2024-01-14",
        title: "Week 2",
      },
    ],
  },
  {
    // When the week doesn't start on a Monday
    periods: [
      {
        id: "1",
        periodStart: "2025-01-01",
        periodEnd: "2025-01-07",
        title: "Week 1",
      },
      {
        id: "2",
        periodStart: "2025-01-08",
        periodEnd: "2025-01-14",
        title: "Week 2",
      },
    ],
  },
];

test("Period starts on monday.", () => {
  const periods = GetWeeklyPeriods(testCases[0].periods, []);
  expect(periods.length).toBe(2);
});

test("Period doesn't start on monday", () => {
  const periods = GetWeeklyPeriods(testCases[1].periods, []);
  expect(periods.length).toBe(4);
});
