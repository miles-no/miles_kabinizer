import { getWeekNumber } from "./getWeekNumber.ts";
import { describe, expect, test } from "vitest";

const testCases = [
  { year: 2019, month: 1, day: 28, week: 9, testReason: "Non-leap year" },
  { year: 2020, month: 1, day: 29, week: 9, testReason: "Leap year" },
  {
    year: 2023,
    month: 1,
    day: 28,
    week: 9,
    testReason: "February in a non-leap year",
  },
  {
    year: 2024,
    month: 0,
    day: 1,
    week: 1,
    testReason: "First day of the year",
  },
  {
    year: 2024,
    month: 0,
    day: 1,
    week: 1,
    testReason: "First day of the year",
  },
  { year: 2024, month: 1, day: 1, week: 5, testReason: "Monday" },
  { year: 2024, month: 1, day: 2, week: 5, testReason: "Tuesday" },
  {
    year: 2024,
    month: 1,
    day: 28,
    week: 9,
    testReason: "February in a leap year",
  },
  { year: 2024, month: 1, day: 29, week: 9, testReason: "Leap year" },
  { year: 2024, month: 1, day: 3, week: 5, testReason: "Wednesday" },
  { year: 2024, month: 1, day: 31, week: 9, testReason: "End of a month" },
  { year: 2024, month: 1, day: 4, week: 5, testReason: "Thursday" },
  { year: 2024, month: 1, day: 5, week: 6, testReason: "Friday" },
  { year: 2024, month: 1, day: 6, week: 6, testReason: "Saturday" },
  { year: 2024, month: 1, day: 7, week: 6, testReason: "Sunday" },
  {
    year: 2024,
    month: 11,
    day: 31,
    week: 1,
    testReason: "Last day of the year",
  },
  {
    year: 2024,
    month: 11,
    day: 31,
    week: 1,
    testReason: "Last day of the year",
  },
  { year: 2024, month: 2, day: 1, week: 9, testReason: "Start of a month" },
  { year: 2024, month: 3, day: 1, week: 14, testReason: "April" },
  { year: 2024, month: 3, day: 30, week: 18, testReason: "Month with 30 days" },
  { year: 2024, month: 4, day: 31, week: 22, testReason: "Month with 31 days" },
  { year: 2024, month: 5, day: 15, week: 24, testReason: "June" },
  {
    year: 2027,
    month: 0,
    day: 1,
    week: 53,
    testReason: "First day of the year",
  },
  { year: 2027, month: 0, day: 28, week: 4, testReason: "January" },
  {
    year: 2028,
    month: 0,
    day: 1,
    week: 52,
    testReason: "First day of the year",
  },
  {
    year: 2029,
    month: 0,
    day: 1,
    week: 1,
    testReason: "First day of the year",
  },
];

describe("getWeekNumber", () => {
  testCases.forEach(({ year, month, day, week, testReason }) => {
    test(` ${year}-${month + 1}-${day} is in week ${week} - ${testReason}`, () => {
      const date = new Date(year, month, day);
      expect(getWeekNumber(date)).toBe(week);
    });
  });
});
