import { weekdayNames, weekdayNamesShort } from "./weekdayNames";
import { describe, expect, it } from "vitest";

describe("weekdayNames", () => {
  it("should return an array of 7 elements", () => {
    expect(weekdayNames.length).toBe(7);
  });

  it("should return full names of weekdays", () => {
    expect(weekdayNames).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  });
});

describe("weekdayNamesShort", () => {
  it("should return an array of 7 elements", () => {
    expect(weekdayNamesShort.length).toBe(7);
  });

  it("should return short names of weekdays", () => {
    expect(weekdayNamesShort).toEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
  });
});
