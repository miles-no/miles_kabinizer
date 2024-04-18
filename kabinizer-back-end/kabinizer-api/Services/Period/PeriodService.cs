using kabinizer_api.Dtos.Draw;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace kabinizer_api.Services.Period;

public class PeriodService(EntityContext entityContext)
{
    public List<PeriodEntity> CreatePeriods(Guid drawId, bool isSpecial, List<DrawPeriod> drawPeriods)
    {
        List<PeriodEntity> periodEntities = new();
        foreach (DrawPeriod drawPeriod in drawPeriods)
        {
            // If the draw period is less than a week, just create one period for the whole draw period
            // The example is Easter where there are two parts, each shorter than one week. 
            // We expect the user to know what they are doing when they input a draw period shorter than a week
            if (isSpecial)
            {
                if (drawPeriod.Title == null)
                {
                    throw new Exception("Draw period must have a title if it is shorter than a week");
                }

                Model.Period period = new(drawPeriod.Start, drawPeriod.End, drawPeriod.Title, drawId);
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
                if (week == firstWeekOfDrawPeriod)
                {
                    startOfWeek = drawPeriod.Start;
                }

                // Don't make periods that end after drawPeriod.End
                if (week == lastWeekOfDrawPeriod)
                {
                    endOfWeek = drawPeriod.End;
                }

                Model.Period period = new(startOfWeek, endOfWeek, drawPeriod.Title ?? "Week " + week, drawId);

                periodEntities.Add(period.ToObject());
            }
        }

        return periodEntities;
    }

    public async Task<PeriodEntity?> GetPeriod(Guid periodId)
    {
        PeriodEntity? period = await entityContext.Periods.FindAsync(periodId);
        if (period == null)
        {
            throw new Exception("Period not found");
        }

        return period;
    }

    public async Task<List<PeriodEntity>> GetCurrentPeriods()
    {
        var periods = await entityContext.Periods
            .Where(p => p.PeriodStart <= DateTime.Now && p.PeriodEnd >= DateTime.Now)
            .ToListAsync();
        return periods;
    }

    public async Task<List<PeriodEntity?>> GetUpcomingPeriods()
    {
        var periods = await entityContext.Periods
            .Where(p => p.PeriodStart > DateTime.Now)
            .ToListAsync();
        return periods;
    }
    
    public async Task<List<PeriodEntity>> GetPastPeriods()
    {
        var periods = await entityContext.Periods
            .Where(p => p.PeriodEnd < DateTime.Now)
            .ToListAsync();
        return periods;
    }
    
    public async Task<IEnumerable<PeriodEntity>> GetAllPeriods()
    {
        return await entityContext.Periods.ToListAsync();
    }
}