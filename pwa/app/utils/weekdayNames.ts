/**
 * `weekdayNames` is an array that contains the names of the weekdays in the current locale
 * (e.g., "Monday", "Tuesday", etc.).
 * Or in Norwegian, "Mandag", "Tirsdag", etc.
 *
 *  It is created by generating an array of length 7 (representing the 7 days in a week),
 * and for each index, a new Date object is created with the year set to 0 and the day set to the current index + 1.
 * The `toLocaleString` method is then called on this Date object with the `weekday` option set to `long`,
 * which returns the full name of the weekday (e.g., "Monday", "Tuesday", etc.).
 */
export const weekdayNames = Array.from({ length: 7 }, (_, i) =>
  new Date(0, 0, i + 1).toLocaleString("default", { weekday: "long" }),
);

export const weekdayNamesShort = Array.from({ length: 7 }, (_, i) =>
  new Date(0, 0, i + 1).toLocaleString("default", { weekday: "short" }),
);
