/**
 * Returns an array of dates between two dates
 * @param from
 * @param to
 */
export function getDaysInPeriod(from: Date, to: Date): Date[] {
  const days: Date[] = [];
  for (
    let date = new Date(from);
    date <= to;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(new Date(date));
  }
  return days;
}
