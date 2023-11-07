import { Period } from "../api";

export const MOCKED_PERIODS: Period[] = [
  {
    title: "",
    periodStart: "2024-01-01",
    periodEnd: "2024-02-25",
    isSpecialPeriod: false,
  },
  {
    title: "Vinterferie 1",
    periodStart: "2024-02-26",
    periodEnd: "2024-02-29",
    isSpecialPeriod: true,
  },
  {
    title: "Vinterferie 2",
    periodStart: "2024-03-01",
    periodEnd: "2024-03-03",
    isSpecialPeriod: true,
  },
  {
    title: "",
    periodStart: "2024-03-04",
    periodEnd: "2024-03-24",
    isSpecialPeriod: false,
  },
  {
    title: "Påskeferie 1",
    periodStart: "2024-03-25",
    periodEnd: "2024-03-28",
    isSpecialPeriod: true,
  },
  {
    title: "Påskeferie 2",
    periodStart: "2024-03-29",
    periodEnd: "2024-04-01",
    isSpecialPeriod: true,
  },
  {
    title: "",
    periodStart: "2024-04-02",
    periodEnd: "2024-06-02",
    isSpecialPeriod: false,
  },
];
