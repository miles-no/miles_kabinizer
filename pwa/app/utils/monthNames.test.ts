import { describe, expect, test } from "vitest";
import { monthNames } from "~/utils/monthNames";

describe("monthNames", () => {
  test("Array length is 12", () => {
    expect(monthNames.length).toBe(12);
  });

  test("First month is January", () => {
    expect(monthNames[0]).toBe("January");
  });

  test("Last month is December", () => {
    expect(monthNames[11]).toBe("December");
  });

  test("Correct month names", () => {
    expect(monthNames).toEqual([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
  });
});
