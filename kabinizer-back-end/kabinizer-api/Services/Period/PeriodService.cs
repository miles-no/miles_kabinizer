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
        List<PeriodEntity> periodEntities = [];
        foreach (DrawPeriod drawPeriod in drawPeriods)
        {
            if (isSpecial)
            {
                periodEntities.Add(CreateSpecialPeriod(drawPeriod, drawId));
            }
            else
            {
                periodEntities.AddRange(CreateRegularPeriods(drawPeriod, drawId));
            }
        }

        return periodEntities;
    }

    private PeriodEntity CreateSpecialPeriod(DrawPeriod drawPeriod, Guid drawId)
    {
        if (drawPeriod.Title == null)
        {
            throw new Exception("Draw period must have a title if it is shorter than a week");
        }

        Model.Period period = new(drawPeriod.Start, drawPeriod.End, drawPeriod.Title, drawId);
        return period.ToObject();
    }

    private List<PeriodEntity> CreateRegularPeriods(DrawPeriod drawPeriod, Guid drawId)
    {
        List<PeriodEntity> periodEntities = new();
        int firstWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.Start);
        int lastWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.End);

        for (int week = firstWeekOfDrawPeriod; week <= lastWeekOfDrawPeriod; week++)
        {
            periodEntities.Add(CreatePeriodForWeek(drawPeriod, drawId, week));
        }

        return periodEntities;
    }

    private PeriodEntity CreatePeriodForWeek(DrawPeriod drawPeriod, Guid drawId, int week)
    {
        DateTime startOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Monday);
        DateTime endOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Sunday);

        // Don't make periods that start before drawPeriod.Start
        if (week == ISOWeek.GetWeekOfYear(drawPeriod.Start))
        {
            startOfWeek = drawPeriod.Start;
        }

        // Don't make periods that end after drawPeriod.End
        if (week == ISOWeek.GetWeekOfYear(drawPeriod.End))
        {
            endOfWeek = drawPeriod.End;
        }

        Model.Period period = new(startOfWeek, endOfWeek, drawPeriod.Title ?? "Week " + week, drawId);
        return period.ToObject();
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

    public async Task<List<PeriodEntity>> GetUpcomingPeriods()
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