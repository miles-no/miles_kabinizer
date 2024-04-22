using kabinizer_api.Dtos.Draw;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace kabinizer_api.Services.Period;

public class PeriodService(EntityContext entityContext)
{
    public List<PeriodEntity> CreatePeriods(Guid drawId, List<DrawPeriod> drawPeriods)
    {
        List<PeriodEntity> periodEntities = [];
        foreach (DrawPeriod drawPeriod in drawPeriods)
        {
            bool periodIsShorterThanOneWeek = (drawPeriod.End - drawPeriod.Start).TotalDays < 7;

            periodEntities.AddRange(
                periodIsShorterThanOneWeek
                    ? [CreateSinglePeriod(drawPeriod, drawId)]
                    : CreateWeeklyPeriods(drawPeriod, drawId));
        }

        return periodEntities;
    }

    private PeriodEntity CreateSinglePeriod(DrawPeriod drawPeriod, Guid drawId)
    {
        if (drawPeriod.Title?.Trim().Length == 0)
        {
            throw new Exception("Draw period must have a title if it is shorter than a week");
        }

        return new Model.Period(drawPeriod.Start, drawPeriod.End, drawPeriod.Title, drawId).ToObject();
    }

    private List<PeriodEntity> CreateWeeklyPeriods(DrawPeriod drawPeriod, Guid drawId)
    {
        List<PeriodEntity> periodEntities = [];
        int firstWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.Start);
        int lastWeekOfDrawPeriod = ISOWeek.GetWeekOfYear(drawPeriod.End);

        for (int week = firstWeekOfDrawPeriod; week <= lastWeekOfDrawPeriod; week++)
        {
            periodEntities.Add(CreateWeeklyPeriod(drawPeriod, drawId, week));
        }

        return periodEntities;
    }

    private PeriodEntity CreateWeeklyPeriod(DrawPeriod drawPeriod, Guid drawId, int week)
    {
        DateTime startOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Monday);
        DateTime endOfWeek = ISOWeek.ToDateTime(drawPeriod.Start.Year, week, DayOfWeek.Sunday);

        if (week == ISOWeek.GetWeekOfYear(drawPeriod.Start)) startOfWeek = drawPeriod.Start;
        if (week == ISOWeek.GetWeekOfYear(drawPeriod.End)) endOfWeek = drawPeriod.End;

        return new Model.Period(startOfWeek, endOfWeek, drawPeriod.Title ?? "Week " + week, drawId).ToObject();
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

    public async Task<List<PeriodEntity>> GetCurrentPeriods() => await entityContext.Periods
        .Where(p => p.PeriodStart <= DateTime.Now && p.PeriodEnd >= DateTime.Now).ToListAsync();

    public async Task<List<PeriodEntity>> GetUpcomingPeriods() =>
        await entityContext.Periods.Where(p => p.PeriodStart > DateTime.Now).ToListAsync();

    public async Task<List<PeriodEntity>> GetPastPeriods() =>
        await entityContext.Periods.Where(p => p.PeriodEnd < DateTime.Now).ToListAsync();

    public async Task<IEnumerable<PeriodEntity>> GetAllPeriods() => await entityContext.Periods.ToListAsync();
}