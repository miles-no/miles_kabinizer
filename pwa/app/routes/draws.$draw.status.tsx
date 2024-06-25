import { getWeekNumber } from "~/utils/getWeekNumber";

const getWeeksInRange = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const weeks = [];

  while (startDate <= endDate) {
    weeks.push(getWeekNumber(new Date(startDate)));
    startDate.setDate(startDate.getDate() + 7);
  }

  return weeks;
};

export default function DrawStatus() {
  const draw = {
    title: "Draw 1",
    description: "This is a test draw",
    periods: [
      { from: "2022-01-01", to: "2022-01-07" },
      { from: "2022-01-08", to: "2022-01-10" },
      { from: "2022-01-11", to: "2022-01-14" },
      { from: "2022-01-15", to: "2022-01-21" },
    ],
    interestedUsers: [
      { name: "Henry", periodIndex: 0 },
      { name: "Henry", periodIndex: 2 },
      { name: "Anna", periodIndex: 0 },
      { name: "Anna", periodIndex: 1 },
      { name: "Siri", periodIndex: 0 },
      { name: "Siri", periodIndex: 3 },
    ],
  };

  let globalWeekIndex = 0;
  const weekCounts = draw.periods.reduce(
    (acc: { [key: number]: number }, period) => {
      getWeeksInRange(new Date(period.from), new Date(period.to)).forEach(
        (week) => {
          acc[week] = (acc[week] || 0) + 1;
          globalWeekIndex++;
        },
      );
      return acc;
    },
    {},
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl">{draw.title}</h1>
      <p>{draw.description}</p>
      <h2 className="text-xl">Interested Users</h2>
      <ul className="flex gap-1">
        {draw.interestedUsers
          .filter(
            (user, index, self) =>
              index === self.findIndex((t) => t.name === user.name),
          )
          .map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th>Week</th>
            <th>From</th>
            <th>To</th>
            <th>Interested Users</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {draw.periods.map((period, index) => {
            const weeks = getWeeksInRange(
              new Date(period.from),
              new Date(period.to),
            );
            return weeks.map((weekNumber, weekIndex) => {
              const fromDate = new Date(period.from);
              const toDate = new Date(period.to);

              return (
                <tr key={`${index}-${weekIndex}`}>
                  <td>
                    Week {weekNumber} {weekIndex}
                    {weekCounts[weekNumber] > 1
                      ? " (" + String.fromCharCode(65 + weekIndex) + ")"
                      : ""}
                  </td>
                  <td>
                    {weekIndex === 0
                      ? fromDate.toLocaleDateString("default", {
                          day: "2-digit",
                          month: "short",
                        })
                      : ""}
                  </td>
                  <td>
                    {weekIndex === weeks.length - 1
                      ? toDate.toLocaleDateString("default", {
                          day: "2-digit",
                          month: "short",
                        })
                      : ""}
                  </td>
                  <td>
                    <ul className="flex gap-1">
                      {draw.interestedUsers
                        .filter((user) => user.periodIndex === index)
                        .map((user, userIndex) => (
                          <li key={userIndex}>{user.name}</li>
                        ))}
                    </ul>
                  </td>
                  <td className="text-gray-500">TBA</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
