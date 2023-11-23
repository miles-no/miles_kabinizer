export type Week = {
  from: Date;
  to: Date;
};

export type Option = {
  from: Date;
  to: Date;
  deadline: Date;
  isSpecialPeriod?: boolean | null;
  title?: string | null;
  halfDay?: boolean;
};

export type ColorType = {
  background: string;
  primary: string;
  selected: string;
  special: string;
  specialSelected: string;
};
