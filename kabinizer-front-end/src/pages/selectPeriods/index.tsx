import { useQuery } from "react-query";
import { DrawService, Period } from "../../../api/index.ts";
import Calendar from "./Calendar.tsx";

const SelectPeriodsView = () => {
  const { data = [] } = useQuery(["getApiDraw"], () =>
    DrawService.getApiDraw(),
  );

  const compareDates = (a: Period, b: Period) => {
    const dateA = new Date(a.periodStart ?? "").getTime();
    const dateB = new Date(b.periodStart ?? "").getTime();
    return dateA > dateB ? 1 : -1;
  };

  const periods = data
    .map((value) => value.periods ?? [])
    .flat()
    .sort((a, b) => {
      return compareDates(a, b);
    });

  return (
    <div>
      Calendar
      <div>
        <Calendar periods={periods} />
      </div>
    </div>
  );
};

export default SelectPeriodsView;
