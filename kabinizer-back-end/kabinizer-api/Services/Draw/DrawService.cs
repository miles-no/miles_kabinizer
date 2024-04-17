using kabinizer_api.Dtos.Draw;
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
        Guid drawId = Guid.NewGuid();
        var drawEntity = new DrawEntity
        {
            Id = drawId,
            DeadlineStart = draw.DeadlineStart,
            DeadlineEnd = draw.DeadlineEnd,
            Title = draw.Title,
            Periods = periodService.CreatePeriods(drawId, draw.IsSpecial, draw.DrawPeriods),
            IsSpecial = draw.IsSpecial
        };
        entityContext.Draws.Add(drawEntity);
        entityContext.SaveChanges();
    }

    public void DeleteDraw(string id)
    {   
        var draw = entityContext.Draws.Find(Guid.Parse(id)) ?? throw new Exception("Draw not found");
        entityContext.Draws.Remove(draw);
        entityContext.SaveChanges();
    }
}
