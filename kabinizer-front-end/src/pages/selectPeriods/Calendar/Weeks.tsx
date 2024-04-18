import WeekNumber from "../../../components/WeekNumber";
import { WeekMapType } from "@/types";
import Options, { OptionsProps } from "./Options";

type WeeksProps = {
  weeks: WeekMapType;
} & Omit<OptionsProps, "options">;

const Weeks = ({ weeks, month, selected, onClick }: WeeksProps) => {
  return (
    <div className="flex h-full flex-col gap-y-4">
      {Object.entries(weeks).map(([week, options]) => (
        <Week key={week} week={Number(week)}>
          <Options
            options={options}
            selected={selected}
            onClick={onClick}
            month={Number(month)}
          />
        </Week>
      ))}
    </div>
  );
};

type WeekProps = {
  children: React.ReactNode;
  week: number;
};

const Week = ({ children, week }: WeekProps) => {
  return (
    <div key={week} className="flex w-full gap-x-4">
      <WeekNumber value={week} />
      {children}
    </div>
  );
};

export default Weeks;
