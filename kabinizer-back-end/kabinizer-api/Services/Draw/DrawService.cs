using kabinizer_api.Dtos.Draw;
using kabinizer_api.Services.Period;
using kabinizer_data;
using kabinizer_data.Entities;

namespace kabinizer_api.Services.Draw;

public class DrawService
{
    private readonly EntityContext entityContext;
    private readonly PeriodService periodService;

    public DrawService(EntityContext entityContext, PeriodService periodService)
    {
        this.entityContext = entityContext;
        this.periodService = periodService;
    }

    public void CreateDraw(CreateDrawDto draw)
    {
        var drawEntity = new DrawEntity
        {
            DeadlineStart = draw.DeadlineStart,
            DeadlineEnd = draw.DeadlineEnd,
            Title = draw.Title,
            Periods = periodService.CreatePeriods(draw.DrawPeriods)
        };
        entityContext.Draws.Add(drawEntity);
        entityContext.SaveChanges();
    }
}
