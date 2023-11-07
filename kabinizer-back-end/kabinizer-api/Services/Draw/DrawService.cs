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
            DeadlineStart = draw.DeadlineStart,
            DeadlineEnd = draw.DeadlineEnd,
            Title = draw.Title,
            Periods = _periodService.CreatePeriods(draw.DrawPeriods)
        };
        _entityContext.Draws.Add(drawEntity);
        _entityContext.SaveChanges();
    }
}
