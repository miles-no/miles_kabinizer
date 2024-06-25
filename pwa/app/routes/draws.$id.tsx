import { useLoaderData } from "@remix-run/react";
import { groupDaysAndCheckExistence } from "~/utils/groupDaysAndCheckExistence";
import { weekdayNames } from "~/utils/weekdayNames";

type Period = {
  from: string;
  to: string;
};

export const loader = async () => {
  const periods: Period[] = [
    { from: "2022-01-01", to: "2022-01-31" },
    { from: "2022-02-01", to: "2022-02-28" },
    { from: "2022-03-01", to: "2022-04-28" },
  ];
  return {
    title: "Draw 1",
    description: "Description of draw 1",
    special_draw_exclude_last_year_winners: true,
    reserved_for_families_with_schoolchildren: true,
    periods,
  };
};

type PeriodProps = {
  period: Period;
};

function Period({ period }: PeriodProps) {
  const from = new Date(period.from);
  const to = new Date(period.to);
  const weekData = groupDaysAndCheckExistence(from, to);
  const weekdays = weekdayNames.map((weekday) => weekday.slice(0, 1));

  return (
    <div>
      <h3 className="text-xl">
        {from.toLocaleDateString()} - {to.toLocaleDateString()}
      </h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            {weekdays.map((day, index) => (
              <th key={index} className="border px-4 py-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekData.map(({ weekNumber, weekDays }) => (
            <tr key={weekNumber}>
              <td className="border px-4 py-2 text-center">{weekNumber}</td>
              {weekDays.map(({ dayIndex, isInPeriod }) => (
                <td key={dayIndex} className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    disabled={!isInPeriod}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ViewDraw() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4 max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl">{data.title}</h1>
        <p className="text-xl">{data.description}</p>
      </div>

      <div>
        <h2 className="text-xl">Things to note:</h2>
        <ul>
          {data.reserved_for_families_with_schoolchildren && (
            <li>
              👧👦 This draw is reserved for families with schoolchildren.
            </li>
          )}
          {data.special_draw_exclude_last_year_winners && (
            <li>🏆🚫 You cannot win this draw if you won last year, sorry!</li>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-xl">Draw Periods</h2>
        {data.periods.map((period, index) => (
          <Period key={index} period={period} />
        ))}
      </div>
    </div>
  );
}
