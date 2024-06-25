import { groupByStatusAndWeekAndFillMissingDays } from "~/utils/groupByStatusAndWeekAndFillMissingDays";
import { OutputDate, Status } from "~/utils/fillWeekDays.test";
import { CalendarLegend } from "~/components/calendarLegend";
import { groupDayGroupsByWeek } from "~/utils/groupDayGroupsByWeek";
import { weekdayNamesShort } from "~/utils/weekdayNames";

const dayStatusColorMap: Record<Status, string> = {
  Available: "border-2 border-primary border-dashed font-extrabold text-xl",
  Selected: "border-2 bg-accent text-accent-content font-extrabold text-xl",
  Assigned: "border-2 bg-primary text-primary-content font-extrabold text-xl",
  Busy: "border-2 bg-gray-100 text-gray-400 font-extrabold text-xl",
  Fill: "border-2 border-transparent bg-base-100 text-xl opacity-50",
};

export const DayButtonsCalendarSection = () => {
  const days: OutputDate[] = [
    // Jan
    // Week 52
    { date: new Date(2022, 0, 1), status: "Available" },
    { date: new Date(2022, 0, 2), status: "Available" },
    // Week 1
    { date: new Date(2022, 0, 3), status: "Selected" },
    { date: new Date(2022, 0, 4), status: "Selected" },
    // --
    { date: new Date(2022, 0, 5), status: "Assigned" },
    //  --
    { date: new Date(2022, 0, 6), status: "Busy" },
    // --
    { date: new Date(2022, 0, 7), status: "Available" },
    // --
    { date: new Date(2022, 0, 8), status: "Busy" },
    { date: new Date(2022, 0, 9), status: "Busy" },
    // Feb
    // Week 5
    { date: new Date(2022, 1, 1), status: "Available" },
    { date: new Date(2022, 1, 2), status: "Available" },
    // --
    { date: new Date(2022, 1, 3), status: "Selected" },
    { date: new Date(2022, 1, 4), status: "Selected" },
    // --
    { date: new Date(2022, 1, 5), status: "Assigned" },
    // --
    { date: new Date(2022, 1, 6), status: "Busy" },
    // Week 6
    { date: new Date(2022, 1, 7), status: "Available" },
    { date: new Date(2022, 1, 9), status: "Available" },
    { date: new Date(2022, 1, 10), status: "Available" },
  ];

  const dayGroupsByWeek = groupDayGroupsByWeek(
    groupByStatusAndWeekAndFillMissingDays(days),
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold text-primary">
        Day buttons in a calendar
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-8 text-center">
          <p className="min-w-8 text-start text-primary">Uke</p>
          {weekdayNamesShort.map((name) => (
            <p key={name} className="min-w-8">
              {name}
            </p>
          ))}
        </div>
        {dayGroupsByWeek.map((week, index) => (
          <div key={index} className="grid grid-cols-8">
            <h3 className="font-semibold min-w-8 self-center">
              {week.weekNumber}
            </h3>
            {week.groupedDays.map((dayGroup) => (
              <div
                className={`rounded-full col-span-${dayGroup.days.length} ${dayStatusColorMap[dayGroup.status]} flex justify-around min-w-8`}
                key={dayGroup.sortIndex}
              >
                {dayGroup.days.map((day) => (
                  <p key={day.date.getTime()}>{day.date.getDate()}</p>
                ))}
              </div>
            ))}
          </div>
        ))}
        <CalendarLegend />
      </div>
    </section>
  );
};
