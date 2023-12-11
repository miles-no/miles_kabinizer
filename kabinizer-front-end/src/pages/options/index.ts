import { ColorType } from "../../types";

export const MONTHS: Record<number, string> = {
  0: "Januar",
  1: "Februar",
  2: "Mars",
  3: "April",
  4: "Mai",
  5: "Juni",
  6: "Juli",
  7: "August",
  8: "September",
  9: "Oktober",
  10: "November",
  11: "Desember",
};

export const COLORS: Record<number, ColorType> = {
  0: {
    background: "#DDD4E9",
    primary: "#AB98C5",
    selected: "#5C447D",
    special: "#FE757D",
    specialSelected: "#ff303d",
  },
  1: {
    background: "#B8C5DC",
    primary: "#8497B8",
    selected: "#354A71",
    special: "#FE757D",
    specialSelected: "#ff303d",
  },
};
