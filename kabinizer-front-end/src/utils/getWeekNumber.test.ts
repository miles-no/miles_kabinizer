import { getWeekNumber } from "./getWeekNumber.ts";
import { expect, test } from "vitest";

test("correct week number for a date in the middle of the year", () => {
  const date = new Date(2024, 5, 15); // June 15, 2024
  expect(getWeekNumber(date)).toBe(24);
});

test("correct week number for a date at the start of the year", () => {
  const date = new Date(2024, 0, 1); // January 1, 2024
  expect(getWeekNumber(date)).toBe(1);
});

test("correct week number for a date at the end of the year", () => {
  const date = new Date(2024, 11, 31); // December 31, 2024
  expect(getWeekNumber(date)).toBe(53);
});

test("correct week number for a leap year date", () => {
  const date = new Date(2024, 1, 29); // February 29, 2024
  expect(getWeekNumber(date)).toBe(9);
});

test("correct week number for a non-leap year date", () => {
  const date = new Date(2023, 1, 28); // February 28, 2023
  expect(getWeekNumber(date)).toBe(9);
});

test("correct last week identification for a leap year", () => {
  const date = new Date(2027, 0, 1); // January 1, 2027
  expect(getWeekNumber(date)).toBe(53);
});

test("correct last week identification for a non-leap year", () => {
  const date = new Date(2028, 0, 1); // January 1, 2028
  expect(getWeekNumber(date)).toBe(52);
});

test("correct first week identification when Thursday is in it", () => {
  const date = new Date(2029, 0, 1); // January 1, 2029
  expect(getWeekNumber(date)).toBe(1);
});
