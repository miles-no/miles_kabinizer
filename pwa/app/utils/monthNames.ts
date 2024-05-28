/**
 * `monthNames` is an array that contains the names of the months.
 * It is created by generating an array of length 12 (representing the 12 months in a year),
 * and for each index, a new Date object is created with the year set to 0 and the month set to the current index.
 * The `toLocaleString` method is then called on this Date object with the `month` option set to `long`,
 * which returns the full name of the month (e.g., "January", "February", etc.).
 */
export const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("default", { month: "long" }),
);
