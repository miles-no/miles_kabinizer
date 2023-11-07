using kabinizer_api.Dtos.Draw;
using kabinizer_api.Model;
using kabinizer_data.Entities;
using System.Globalization;

namespace kabinizer_api.Services;

public class PeriodService
{
    public List<PeriodEntity> CreatePeriods(Guid drawId, bool isSpecial, List<DrawPeriod> drawPeriods)
    {
        List<PeriodEntity> periodEntities = new();
        foreach (DrawPeriod drawPeriod in drawPeriods) {
            // If the draw period is less than a week, just create one period for the whole draw period
            // The example is Easter where there are two parts, each shorter than one week. 
            // We expect the user to know what they are doing when they input a draw period shorter than a week
            if (isSpecial) {
                if (drawPeriod.Title == null) {
                    throw new Exception("Draw period must have a title if it is shorter than a week");
                }
                Period period = new(drawPeriod.Start, drawPeriod.End, drawPeriod.Title, drawId);
                periodEntities.Add(period.ToObject());
                continue;
            }

            int firstWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.Start);
            int lastWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.End);

            for (int week = firstWeekOfDrawPeriod; week <= lastWeekOfDrawPeriod; week++)
            {
                DateTime startOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Monday);
                DateTime endOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Sunday);

                // Don't make periods that start before drawPeriod.Start
                if (week == firstWeekOfDrawPeriod) {
                    startOfWeek = drawPeriod.Start;
                }

                // Don't make periods that end after drawPeriod.End
                if (week == lastWeekOfDrawPeriod) {
                    endOfWeek = drawPeriod.End;
                }

                Period period = new(startOfWeek, endOfWeek, drawPeriod.Title ?? "Week " + week, drawId);

                periodEntities.Add(period.ToObject());
            }
        }
        return periodEntities;
    }
}
