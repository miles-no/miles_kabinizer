import { MonthMapType } from "../../types";

const Hump = ({
  month,
  monthMap,
  color,
}: {
  month: number;
  monthMap: MonthMapType;
  color: string;
}) => {
  if (monthMap[month - 1] === undefined) return null;

  const currentMonth = monthMap[month]
    ? Object.entries(monthMap[month])[0]
    : undefined;

  if (currentMonth === undefined) return null;

  const daysCur = currentMonth[1][0].from.getDate();

  return (
    <div className="absolute -top-14 right-0 z-0 flex h-14 w-full pl-[34px]">
      <div style={{ minWidth: `${34.5 * daysCur}px` }} />
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-full rounded-tl-lg border-l-4 border-t-4 border-white pr-[8px]"
      />
    </div>
  );
};

export default Hump;
