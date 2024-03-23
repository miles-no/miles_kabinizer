import { CreateBookingRequestDto, Draw } from "../../../../api";
import { CompareDates } from "../../../utils";
import { GetWeeklyPeriods, getMonthsMap } from "@/utils/calendar";
import Months from "./Months";

const Calendar = ({
  draws,
  selected,
  setSelected,
}: {
  draws: Draw[];
  selected: CreateBookingRequestDto[];
  setSelected: (selected: CreateBookingRequestDto[]) => void;
}) => {
  const periods = draws
    .map((value) => value.periods ?? [])
    .flat()
    .sort((a, b) => {
      return CompareDates(a, b);
    });

  const onClick = (periodId: string) => {
    const checked = selected.find((s) => s.periodId === periodId);

    if (checked) {
      setSelected(selected.filter((s) => s.periodId !== periodId));
    } else {
      const period = periods.find((p) => p.id === periodId);
      if (period) {
        setSelected([
          ...selected,
          {
            periodId: period.id ?? "",
          },
        ]);
      }
    }
  };

  if (periods.length === 0) {
    return <div>No periods</div>;
  }

  const data = GetWeeklyPeriods(periods, draws);
  const monthMap = getMonthsMap(data);

  console.log(monthMap);

  return <Months months={monthMap} selected={selected} onClick={onClick} />;
};

export default Calendar;
