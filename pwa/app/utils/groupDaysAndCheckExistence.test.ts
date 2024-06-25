import { describe, expect, test } from "vitest";
import { groupDaysAndCheckExistence } from "~/utils/groupDaysAndCheckExistence";

describe("groupDaysAndCheckExistence", () => {
  test("Group days and check existence for a week", () => {
    const from = new Date(2024, 0, 1); // January 1, 2024
    const to = new Date(2024, 0, 7); // January 7, 2024
    const result = groupDaysAndCheckExistence(from, to);
    expect(result).toEqual([
      {
        weekNumber: "1",
        weekDays: [
          { dayIndex: 0, isInPeriod: true },
          { dayIndex: 1, isInPeriod: true },
          { dayIndex: 2, isInPeriod: true },
          { dayIndex: 3, isInPeriod: true },
          { dayIndex: 4, isInPeriod: true },
          { dayIndex: 5, isInPeriod: true },
          { dayIndex: 6, isInPeriod: true },
        ],
      },
    ]);
  });

  test("Group days and check existence for a month", () => {
    const from = new Date(2024, 0, 1); // January 1, 2024
    const to = new Date(2024, 0, 31); // January 31, 2024
    const result = groupDaysAndCheckExistence(from, to);
    expect(result.length).toEqual(5); // 5 weeks in January 2024
  });

  test("Group days and check existence for a non-existent period", () => {
    const from = new Date(2024, 0, 1); // January 1, 2024
    const to = new Date(2023, 11, 31); // December 31, 2023
    const result = groupDaysAndCheckExistence(from, to);
    expect(result).toEqual([]);
  });
});
