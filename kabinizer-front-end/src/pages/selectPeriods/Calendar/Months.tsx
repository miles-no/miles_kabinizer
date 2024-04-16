import MonthColumn from "../../../components/MonthVertical";
import { COLORS, MONTHS } from "../../../options";
import { MonthMapType } from "@/types";
import Weeks from "./Weeks";
import { OptionsProps } from "./Options";

type MonthsProps = {
  months: MonthMapType;
} & Omit<OptionsProps, "options" | "month">;

const Months = ({ months, selected, onClick }: MonthsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(months).map(([month, weeks]) => (
        <Month month={Number(month)}>
          <Weeks
            weeks={weeks}
            selected={selected}
            month={Number(month)}
            onClick={onClick}
          />
        </Month>
      ))}
    </div>
  );
};

type MonthProps = {
  children: React.ReactNode;
  month: number;
};

const Month = ({ children, month }: MonthProps) => {
  return (
    <div key={month} className="flex items-center gap-x-4">
      <MonthColumn
        month={MONTHS[month]}
        color={COLORS[month % COLORS.length]?.selected}
      />
      <div
        className={`relative flex w-72 flex-col rounded-lg p-2 ${
          month % 2
            ? "bg-blue-200 dark:bg-blue-700"
            : "bg-purple-200 dark:bg-purple-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Months;
