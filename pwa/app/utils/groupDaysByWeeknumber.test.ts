import { describe, expect, test } from "vitest";
import { getDaysInPeriod } from "~/utils/getDaysInPeriod";
import { groupDaysByWeekNumber } from "~/utils/groupDaysByWeekNumber";

describe("groupDaysByWeekNumber", () => {
  test("Some weeks from January 2024", () => {
    const days = [
      // The two first weeks of January 2024
      ...getDaysInPeriod(new Date("2024-01-01"), new Date("2024-01-14")),
      // Skip one week
      ...getDaysInPeriod(new Date("2024-01-22"), new Date("2024-01-28")),
      // Skip one day
      ...[new Date("2024-01-30"), new Date("2024-01-31")],
    ];
    const weeks = groupDaysByWeekNumber(days);
    expect(weeks).toEqual({
      1: [
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-03"),
        new Date("2024-01-04"),
        new Date("2024-01-05"),
        new Date("2024-01-06"),
        new Date("2024-01-07"),
      ],
      2: [
        new Date("2024-01-08"),
        new Date("2024-01-09"),
        new Date("2024-01-10"),
        new Date("2024-01-11"),
        new Date("2024-01-12"),
        new Date("2024-01-13"),
        new Date("2024-01-14"),
      ],
      4: [
        new Date("2024-01-22"),
        new Date("2024-01-23"),
        new Date("2024-01-24"),
        new Date("2024-01-25"),
        new Date("2024-01-26"),
        new Date("2024-01-27"),
        new Date("2024-01-28"),
      ],
      5: [new Date("2024-01-30"), new Date("2024-01-31")],
    });
  });

  test("Weeks spanning two years", () => {
    const days = [
      ...getDaysInPeriod(new Date("2023-12-25"), new Date("2024-01-07")),
    ];
    const weeks = groupDaysByWeekNumber(days);
    expect(weeks).toEqual({
      // Assuming the week starts on Monday and week 1 of 2024 starts on 2024-01-01
      52: [
        new Date("2023-12-25"),
        new Date("2023-12-26"),
        new Date("2023-12-27"),
        new Date("2023-12-28"),
        new Date("2023-12-29"),
        new Date("2023-12-30"),
        new Date("2023-12-31"),
      ],
      1: [
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-03"),
        new Date("2024-01-04"),
        new Date("2024-01-05"),
        new Date("2024-01-06"),
        new Date("2024-01-07"),
      ],
    });
  });
});
