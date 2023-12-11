export type ColorType = {
  background: string;
  primary: string;
  selected: string;
  special: string;
  specialSelected: string;
};

export type Option = {
  id?: string;
  start: number;
  end: number;
  month: number;
  week: number;
  label: string;
  from: Date;
  to: Date;
  isSpecial: boolean;
};

export type WeekMapType = Record<string, Option[]>;

export type MonthMapType = Record<number, WeekMapType>;
