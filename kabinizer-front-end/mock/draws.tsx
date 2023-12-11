interface Period {
  id: string;
  periodStart: string;
  periodEnd: string;
  title: string;
  drawId: string;
}

interface Draw {
  id: string;
  start: string;
  end: string;
  title: string;
  periods: Period[];
  isSpecial: boolean;
}

function generateDraws(numDraws: number): Draw[] {
  const draws: Draw[] = [];

  for (let i = 0; i < numDraws; i++) {
    const id = Math.random().toString(36).substring(7);
    const start = new Date().toISOString();
    const end = new Date().toISOString();
    const title = Math.random() < 0.5 ? "" : "Holiday";
    const isSpecial = Math.random() < 0.5;

    const periods: Period[] = [];
    let periodStart = start;
    let periodEnd = new Date(
      new Date(start).getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    while (new Date(periodEnd) <= new Date(end)) {
      const periodId = Math.random().toString(36).substring(7);
      const periodTitle = `Period ${periods.length + 1}`;
      periods.push({
        id: periodId,
        periodStart,
        periodEnd,
        title: periodTitle,
        drawId: id,
      });

      periodStart = periodEnd;
      periodEnd = new Date(
        new Date(periodEnd).getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString();
    }

    draws.push({
      id,
      start,
      end,
      title,
      periods,
      isSpecial,
    });
  }

  return draws;
}

const draws = generateDraws(10);

console.log(draws);
