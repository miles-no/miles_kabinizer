using kabinizer_api.Dtos.Deadline;
using kabinizer_data.Entities;
using System.Globalization;

namespace kabinizer_api.Services.Period;

public class PeriodService
{
    public List<PeriodEntity> CreatePeriods(Guid deadlineId, bool isSpecial, List<DeadlinePeriod> deadlinePeriods)
    {
        List<PeriodEntity> periodEntities = [];
        foreach (DeadlinePeriod deadlinePeriod in deadlinePeriods) {
            // If the deadline period is less than a week, just create one period for the whole deadline period
            // The example is Easter where there are two parts, each shorter than one week. 
            // We expect the user to know what they are doing when they input a deadline period shorter than a week
            if (isSpecial) {
                if (deadlinePeriod.Title == null) {
                    throw new Exception("Deadline period must have a title if it is shorter than a week");
                }
                Model.Period period = new(deadlinePeriod.Start, deadlinePeriod.End, deadlinePeriod.Title, deadlineId);
                periodEntities.Add(period.ToObject());
                continue;
            }

            int firstWeekOfDeadlinePeriod = ISOWeek.GetWeekOfYear(deadlinePeriod.Start);
            int lastWeekOfDeadlinePeriod = ISOWeek.GetWeekOfYear(deadlinePeriod.End);

            for (int week = firstWeekOfDeadlinePeriod; week <= lastWeekOfDeadlinePeriod; week++)
            {
                DateTime startOfWeek = ISOWeek.ToDateTime(deadlinePeriod.Start.Year, week, DayOfWeek.Monday);
                DateTime endOfWeek = ISOWeek.ToDateTime(deadlinePeriod.Start.Year, week, DayOfWeek.Sunday);

                // Don't make periods that start before deadlinePeriod.Start
                if (week == firstWeekOfDeadlinePeriod) {
                    startOfWeek = deadlinePeriod.Start;
                }

                // Don't make periods that end after deadlinePeriod.End
                if (week == lastWeekOfDeadlinePeriod) {
                    endOfWeek = deadlinePeriod.End;
                }

                Model.Period period = new(startOfWeek, endOfWeek, deadlinePeriod.Title ?? "Week " + week, deadlineId);

                periodEntities.Add(period.ToObject());
            }
        }
        return periodEntities;
    }
}
