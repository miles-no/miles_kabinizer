import { describe, expect, test } from "vitest";
import { getDaysInPeriod } from "~/utils/getDaysInPeriod";

describe("getDaysInPeriod", () => {
  test("2022-01-01 to 2022-01-31", () => {
    const expectedDates = [
      new Date("2022-01-01"),
      new Date("2022-01-02"),
      new Date("2022-01-03"),
      new Date("2022-01-04"),
      new Date("2022-01-05"),
      new Date("2022-01-06"),
      new Date("2022-01-07"),
      new Date("2022-01-08"),
      new Date("2022-01-09"),
      new Date("2022-01-10"),
      new Date("2022-01-11"),
      new Date("2022-01-12"),
      new Date("2022-01-13"),
      new Date("2022-01-14"),
      new Date("2022-01-15"),
      new Date("2022-01-16"),
      new Date("2022-01-17"),
      new Date("2022-01-18"),
      new Date("2022-01-19"),
      new Date("2022-01-20"),
      new Date("2022-01-21"),
      new Date("2022-01-22"),
      new Date("2022-01-23"),
      new Date("2022-01-24"),
      new Date("2022-01-25"),
      new Date("2022-01-26"),
      new Date("2022-01-27"),
      new Date("2022-01-28"),
      new Date("2022-01-29"),
      new Date("2022-01-30"),
      new Date("2022-01-31"),
    ];

    expect(
      getDaysInPeriod(new Date("2022-01-01"), new Date("2022-01-31")),
    ).toEqual(expectedDates);
  });
});
