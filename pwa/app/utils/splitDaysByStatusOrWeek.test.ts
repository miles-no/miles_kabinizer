import { describe, expect, it } from "vitest";
import { splitDaysByStatusOrWeek } from "~/utils/splitDaysByStatusOrWeek";
import {
  DayGroup,
  DayStatus,
} from "~/utils/groupByStatusAndWeekAndFillMissingDays";

describe("Split days array by status", () => {
  it("Split on status - one week", () => {
    const days: DayStatus[] = [
      {
        date: new Date(2024, 0, 1),
        status: "Available",
      },
      { date: new Date(2024, 0, 2), status: "Fill" },
      { date: new Date(2024, 0, 3), status: "Fill" },
      { date: new Date(2024, 0, 4), status: "Fill" },
      { date: new Date(2024, 0, 5), status: "Fill" },
      { date: new Date(2024, 0, 6), status: "Fill" },
      { date: new Date(2024, 0, 7), status: "Fill" },
    ];

    const result = splitDaysByStatusOrWeek(days);
    const expectedOutput: DayGroup[] = [
      {
        sortIndex: new Date(2024, 0, 1).getTime(),
        week: 1,
        status: "Available",
        days: [{ date: new Date(2024, 0, 1), status: "Available" }],
      },
      {
        sortIndex: new Date(2024, 0, 2).getTime(),
        week: 1,
        status: "Fill",
        days: [
          { date: new Date(2024, 0, 2), status: "Fill" },
          { date: new Date(2024, 0, 3), status: "Fill" },
          { date: new Date(2024, 0, 4), status: "Fill" },
          { date: new Date(2024, 0, 5), status: "Fill" },
          { date: new Date(2024, 0, 6), status: "Fill" },
          { date: new Date(2024, 0, 7), status: "Fill" },
        ],
      },
    ];
    expect(result).toEqual(expectedOutput);
  });

  it("Split on status - two weeks", () => {
    const days: DayStatus[] = [
      { date: new Date(2024, 0, 1), status: "Available" },
      { date: new Date(2024, 0, 2), status: "Fill" },
      { date: new Date(2024, 0, 3), status: "Fill" },
      { date: new Date(2024, 0, 4), status: "Fill" },
      { date: new Date(2024, 0, 5), status: "Fill" },
      { date: new Date(2024, 0, 6), status: "Fill" },
      { date: new Date(2024, 0, 7), status: "Fill" },
      { date: new Date(2024, 0, 8), status: "Selected" },
      { date: new Date(2024, 0, 9), status: "Fill" },
      { date: new Date(2024, 0, 10), status: "Fill" },
      { date: new Date(2024, 0, 11), status: "Fill" },
      { date: new Date(2024, 0, 12), status: "Fill" },
      { date: new Date(2024, 0, 13), status: "Fill" },
      { date: new Date(2024, 0, 14), status: "Fill" },
    ];

    const result = splitDaysByStatusOrWeek(days);
    const expectedOutput: DayGroup[] = [
      {
        sortIndex: new Date(2024, 0, 1).getTime(),
        week: 1,
        status: "Available",
        days: [{ date: new Date(2024, 0, 1), status: "Available" }],
      },
      {
        sortIndex: new Date(2024, 0, 2).getTime(),
        week: 1,
        status: "Fill",
        days: [
          { date: new Date(2024, 0, 2), status: "Fill" },
          { date: new Date(2024, 0, 3), status: "Fill" },
          { date: new Date(2024, 0, 4), status: "Fill" },
          { date: new Date(2024, 0, 5), status: "Fill" },
          { date: new Date(2024, 0, 6), status: "Fill" },
          { date: new Date(2024, 0, 7), status: "Fill" },
        ],
      },
      {
        sortIndex: new Date(2024, 0, 8).getTime(),
        week: 2,
        status: "Selected",
        days: [{ date: new Date(2024, 0, 8), status: "Selected" }],
      },
      {
        sortIndex: new Date(2024, 0, 9).getTime(),
        week: 2,
        status: "Fill",
        days: [
          { date: new Date(2024, 0, 9), status: "Fill" },
          { date: new Date(2024, 0, 10), status: "Fill" },
          { date: new Date(2024, 0, 11), status: "Fill" },
          { date: new Date(2024, 0, 12), status: "Fill" },
          { date: new Date(2024, 0, 13), status: "Fill" },
          { date: new Date(2024, 0, 14), status: "Fill" },
        ],
      },
    ];
    expect(result).toEqual(expectedOutput);
  });
  it("Splits on week-change", () => {
    const days: DayStatus[] = [
      { date: new Date(2024, 0, 7), status: "Available" },
      { date: new Date(2024, 0, 8), status: "Available" },
    ];
    const result = splitDaysByStatusOrWeek(days);
    const expected: DayGroup[] = [
      {
        sortIndex: new Date(2024, 0, 7).getTime(),
        week: 1,
        status: "Available",
        days: [{ date: new Date(2024, 0, 7), status: "Available" }],
      },
      {
        sortIndex: new Date(2024, 0, 8).getTime(),
        week: 2,
        status: "Available",
        days: [{ date: new Date(2024, 0, 8), status: "Available" }],
      },
    ];
    expect(result).toEqual(expected);
  });
});
