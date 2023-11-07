using kabinizer_api.Dtos.Draw;
using kabinizer_data;

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
        Guid drawId = Guid.NewGuid();
        var drawEntity = new DrawEntity
        {
            Id = drawId,
            DeadlineStart = draw.DeadlineStart,
            DeadlineEnd = draw.DeadlineEnd,
            Title = draw.Title,
            Periods = periodService.CreatePeriods(drawId, draw.IsSpecial, draw.DrawPeriods)
        };
        entityContext.Draws.Add(drawEntity);
        entityContext.SaveChanges();
    }
}
