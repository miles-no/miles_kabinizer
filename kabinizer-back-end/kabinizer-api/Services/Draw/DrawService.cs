using kabinizer_data;

namespace kabinizer_api;

public class DrawService
{
    private readonly EntityContext _entityContext;
    private readonly PeriodService _periodService;

    public DrawService(EntityContext entityContext, PeriodService periodService)
    {
        _entityContext = entityContext;
        _periodService = periodService;
    }

    public void CreateDraw(CreateDrawDto draw)
    {
        var drawEntity = new DrawEntity
        {
            Start = draw.DrawStart,
            End = draw.DrawEnd,
            Title = draw.Title,
            Periods = _periodService.CreatePeriods(draw.PeriodStart, draw.PeriodEnd)
        };
        _entityContext.Draws.Add(drawEntity);
        _entityContext.SaveChanges();
    }
}
