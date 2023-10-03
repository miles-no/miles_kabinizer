import { Period } from "../../../../api";
import CalenderItem from "./calenderItem";

const Calender = ({ periods }: { periods: Period[] }) => {
  const transformPeriodsToListOfWeeks = (periods: Period[]) => {
    const weeks: Period[] = [];
    periods.forEach((period) => {
      if (period.isSpecialPeriod) {
        weeks.push(period);
      } else {
        // Split up period into weeks
        const start = new Date(period.periodStart ?? "");
        const end = new Date(period.periodEnd ?? "");
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const numberOfWeeks = Math.ceil(diffDays / 7);
        const week = 7;
        for (let i = 0; i < numberOfWeeks; i++) {
          const newPeriod = {
            ...period,
            periodStartDate: new Date(
              start.getTime() + i * week * 24 * 60 * 60 * 1000
            ).toDateString(),
            periodEndDate: new Date(
              start.getTime() +
                (i + 1) * week * 24 * 60 * 60 * 1000 -
                24 * 60 * 60 * 1000
            ).toDateString(),
          };
          weeks.push(newPeriod);
        }
      }
    });
    return weeks;
  };

  const weeks = transformPeriodsToListOfWeeks(periods);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {weeks.map((week, index) => (
          <CalenderItem key={index} {...week} />
        ))}
      </div>
    </div>
  );
};

export default Calender;
