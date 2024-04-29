import { expect, test } from "vitest";
import { generateMonthWeeks } from "@/utils/generateMonthWeeks.ts";

test("January 2024: 31 days starting on Monday", () => {
  const weeks = generateMonthWeeks(0, 2024); // January 2024
  expect(weeks).toEqual([
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, null, null, null, null],
  ]);
});

test("April 2024: 30 days starting on Tuesday", () => {
  const weeks = generateMonthWeeks(3, 2021); // April 2024
  expect(weeks).toEqual([
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, null, null],
  ]);
});

test("February 2023: 28 days starting on Wednesday", () => {
  const weeks = generateMonthWeeks(1, 2023); // February 2023
  expect(weeks).toEqual([
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, null, null, null, null, null],
  ]);
});

test("February 2024: 29 days starting on Thursday", () => {
  const weeks = generateMonthWeeks(1, 2024); // February 2024
  expect(weeks).toEqual([
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, null, null, null],
  ]);
});

test("Leap Year February 2020", () => {
  const weeks = generateMonthWeeks(1, 2020); // February 2020
  expect(weeks).toEqual([
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, null],
  ]);
});

test("March 2028: 31 days starting on Wednesday", () => {
  const weeks = generateMonthWeeks(2, 2028); // March 2028
  expect(weeks).toEqual([
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ]);
});
