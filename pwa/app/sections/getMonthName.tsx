export const getMonthName = (month: number) =>
  new Date(2022, month, 1).toLocaleString("default", { month: "short" });
