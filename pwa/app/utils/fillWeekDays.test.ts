import { describe, expect, it } from "vitest";
import { fillWeekDays } from "~/utils/fillWeekDays";

export type Status = "Available" | "Selected" | "Assigned" | "Busy" | "Fill";

export interface OutputDate {
  date: Date;
  status: Status;
}

export interface OutputWeek {
  sortIndex: number;
  week: number;
  status: Status;
  days: OutputDate[];
}

describe("Fill week days", () => {
  it("Fills in missing days", () => {
    expect(
      fillWeekDays([
        {
          date: new Date(2024, 0, 1),
          status: "Available",
        },
      ]),
    ).toEqual([
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
    ]);
  });

  it("Fills in days between two provided days", () => {
    expect(
      fillWeekDays([
        {
          date: new Date(2024, 0, 1),
          status: "Available",
        },
        {
          date: new Date(2024, 0, 3),
          status: "Selected",
        },
      ]),
    ).toEqual([
      {
        date: new Date(2024, 0, 1),
        status: "Available",
      },
      { date: new Date(2024, 0, 2), status: "Fill" },
      { date: new Date(2024, 0, 3), status: "Selected" },
      { date: new Date(2024, 0, 4), status: "Fill" },
      { date: new Date(2024, 0, 5), status: "Fill" },
      { date: new Date(2024, 0, 6), status: "Fill" },
      { date: new Date(2024, 0, 7), status: "Fill" },
    ]);
  });

  it("Fills in days in a week with three spread out days", () => {
    expect(
      fillWeekDays([
        {
          date: new Date(2024, 0, 1),
          status: "Available",
        },
        {
          date: new Date(2024, 0, 3),
          status: "Selected",
        },
        {
          date: new Date(2024, 0, 6),
          status: "Busy",
        },
      ]),
    ).toEqual([
      {
        date: new Date(2024, 0, 1),
        status: "Available",
      },
      { date: new Date(2024, 0, 2), status: "Fill" },
      { date: new Date(2024, 0, 3), status: "Selected" },
      { date: new Date(2024, 0, 4), status: "Fill" },
      { date: new Date(2024, 0, 5), status: "Fill" },
      { date: new Date(2024, 0, 6), status: "Busy" },
      { date: new Date(2024, 0, 7), status: "Fill" },
    ]);
  });
  it("Fills in days for two weeks when provided day is in two weeks", () => {
    expect(
      fillWeekDays([
        {
          date: new Date(2024, 0, 1),
          status: "Available",
        },
        {
          date: new Date(2024, 0, 8),
          status: "Selected",
        },
      ]),
    ).toEqual([
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
      { date: new Date(2024, 0, 8), status: "Selected" },
      { date: new Date(2024, 0, 9), status: "Fill" },
      { date: new Date(2024, 0, 10), status: "Fill" },
      { date: new Date(2024, 0, 11), status: "Fill" },
      { date: new Date(2024, 0, 12), status: "Fill" },
      { date: new Date(2024, 0, 13), status: "Fill" },
      { date: new Date(2024, 0, 14), status: "Fill" },
    ]);
  });
});

//
