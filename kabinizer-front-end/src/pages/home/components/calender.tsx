import { Period } from "../../../../api";
import { Option } from "../../../types";
import { getWeeks } from "../../../utils";
import CalenderItem from "./calenderItem";

const Calender = ({
  periods,
  options,
}: {
  periods: Period[];
  options: Option[];
}) => {
  const weeks = transformPeriodsToListOfWeeks(periods);

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-1">
        <div className="flex flex-col gap-y-1">
          {weeks.map((week, index) => (
            <p
              key={index}
              className="h-12 w-8 flex justify-center items-center"
            >
              {week.from.getDate()}
            </p>
          ))}
        </div>
        <div className="h-12 gap-y-1 flex flex-wrap w-[21rem]">
          {weeks.map((week, index) => (
            <CalenderItem
              key={index}
              periods={periods}
              from={week.from}
              options={options}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-1">
          {weeks.map((week, index) => (
            <p
              key={index}
              className="h-12 w-8 flex justify-center items-center"
            >
              {week.to.getDate()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const transformPeriodsToListOfWeeks = (periods: Period[]) => {
  const start = periods[0].periodStart ?? "";
  const end = periods[periods.length - 1].periodEnd ?? "";

  return getWeeks(new Date(start), new Date(end));
};

export default Calender;
