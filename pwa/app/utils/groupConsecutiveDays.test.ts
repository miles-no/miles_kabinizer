import { describe, expect, it } from "vitest";
import { OutputDate, OutputWeek } from "~/utils/fillWeekDays.test";
import { groupByStatusAndWeekAndFillMissingDays } from "~/utils/groupByStatusAndWeekAndFillMissingDays";

describe("groupByStatusAndWeek", () => {
  it("groups consecutive days with the same status and fills in missing days with Fill", () => {
    const days: OutputDate[] = [
      // Jan
      // Week 52
      { date: new Date(2022, 0, 1), status: "Available" },
      { date: new Date(2022, 0, 2), status: "Available" },
      // Week 1
      { date: new Date(2022, 0, 3), status: "Selected" },
      { date: new Date(2022, 0, 4), status: "Selected" },
      // --
      { date: new Date(2022, 0, 5), status: "Assigned" },
      //  --
      { date: new Date(2022, 0, 6), status: "Busy" },
      // --
      { date: new Date(2022, 0, 7), status: "Available" },
      // --
      { date: new Date(2022, 0, 8), status: "Busy" },
      { date: new Date(2022, 0, 9), status: "Busy" },
      // Feb
      // Week 5
      { date: new Date(2022, 1, 1), status: "Available" },
      { date: new Date(2022, 1, 2), status: "Available" },
      // --
      { date: new Date(2022, 1, 3), status: "Selected" },
      { date: new Date(2022, 1, 4), status: "Selected" },
      // --
      { date: new Date(2022, 1, 5), status: "Assigned" },
      // --
      { date: new Date(2022, 1, 6), status: "Busy" },
      // Week 6
      { date: new Date(2022, 1, 7), status: "Available" },
      { date: new Date(2022, 1, 9), status: "Available" },
      { date: new Date(2022, 1, 10), status: "Available" },
    ];

    const result = groupByStatusAndWeekAndFillMissingDays(days);
    const expected: OutputWeek[] = [
      // Jan
      //   NB: This week is not in the data,
      //   but it should be included in the result because it belongs to the same week (Fill)
      {
        sortIndex: new Date(2021, 11, 27).getTime(),
        week: 52,
        status: "Fill",
        days: [
          { date: new Date(2021, 11, 27), status: "Fill" },
          { date: new Date(2021, 11, 28), status: "Fill" },
          { date: new Date(2021, 11, 29), status: "Fill" },
          { date: new Date(2021, 11, 30), status: "Fill" },
          { date: new Date(2021, 11, 31), status: "Fill" },
        ],
      },
      // Week 52
      {
        sortIndex: new Date(2022, 0, 1).getTime(),
        week: 52,
        status: "Available",
        days: [
          { date: new Date(2022, 0, 1), status: "Available" },
          { date: new Date(2022, 0, 2), status: "Available" },
        ],
      },
      // Week 1
      {
        sortIndex: new Date(2022, 0, 3).getTime(),
        week: 1,
        status: "Selected",
        days: [
          { date: new Date(2022, 0, 3), status: "Selected" },
          { date: new Date(2022, 0, 4), status: "Selected" },
        ],
      },
      {
        sortIndex: new Date(2022, 0, 5).getTime(),
        week: 1,
        status: "Assigned",
        days: [{ date: new Date(2022, 0, 5), status: "Assigned" }],
      },
      {
        sortIndex: new Date(2022, 0, 6).getTime(),
        week: 1,
        status: "Busy",

        days: [{ date: new Date(2022, 0, 6), status: "Busy" }],
      },
      {
        sortIndex: new Date(2022, 0, 7).getTime(),
        week: 1,
        status: "Available",
        days: [{ date: new Date(2022, 0, 7), status: "Available" }],
      },
      {
        sortIndex: new Date(2022, 0, 8).getTime(),
        week: 1,
        status: "Busy",
        days: [
          { date: new Date(2022, 0, 8), status: "Busy" },
          { date: new Date(2022, 0, 9), status: "Busy" },
        ],
      },
      // Feb
      // Week 5
      {
        sortIndex: new Date(2022, 0, 31).getTime(),
        week: 5,
        status: "Fill",
        days: [{ date: new Date(2022, 0, 31), status: "Fill" }], //   Note filling in the first day of the week
      },
      {
        sortIndex: new Date(2022, 1, 1).getTime(),

        week: 5,
        status: "Available",
        days: [
          { date: new Date(2022, 1, 1), status: "Available" },
          { date: new Date(2022, 1, 2), status: "Available" },
        ],
      },
      {
        sortIndex: new Date(2022, 1, 3).getTime(),
        week: 5,
        status: "Selected",
        days: [
          { date: new Date(2022, 1, 3), status: "Selected" },
          { date: new Date(2022, 1, 4), status: "Selected" },
        ],
      },
      {
        sortIndex: new Date(2022, 1, 5).getTime(),
        week: 5,
        status: "Assigned",
        days: [{ date: new Date(2022, 1, 5), status: "Assigned" }],
      },
      {
        sortIndex: new Date(2022, 1, 6).getTime(),
        week: 5,
        status: "Busy",
        days: [{ date: new Date(2022, 1, 6), status: "Busy" }],
      },
      // Week 6
      {
        sortIndex: new Date(2022, 1, 7).getTime(),
        week: 6,
        status: "Available",
        days: [{ date: new Date(2022, 1, 7), status: "Available" }],
      },
      {
        sortIndex: new Date(2022, 1, 8).getTime(),
        week: 6,
        status: "Fill",
        days: [{ date: new Date(2022, 1, 8), status: "Fill" }], //   fill in the day between
      },
      {
        sortIndex: new Date(2022, 1, 9).getTime(),
        week: 6,
        status: "Available",
        days: [
          { date: new Date(2022, 1, 9), status: "Available" },
          { date: new Date(2022, 1, 10), status: "Available" },
        ],
      },
      {
        sortIndex: new Date(2022, 1, 11).getTime(),
        week: 6,
        status: "Fill", //     Fill in the rest of the week
        days: [
          { date: new Date(2022, 1, 11), status: "Fill" },
          { date: new Date(2022, 1, 12), status: "Fill" },
          { date: new Date(2022, 1, 13), status: "Fill" },
        ],
      },
    ];
    expect(result).toEqual(expected);
  });
});
