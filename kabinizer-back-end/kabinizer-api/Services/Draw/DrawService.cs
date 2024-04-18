using kabinizer_api.Dtos.Draw;
using kabinizer_api.Services.Period;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_api.Services.Draw;

public class DrawService(EntityContext entityContext, PeriodService periodService)
{
    public async Task<DrawEntity> CreateDraw(CreateDrawDto draw)
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
        await entityContext.SaveChangesAsync();
        return drawEntity;
    }

    public async Task<DrawEntity> GetDraw(Guid drawId)
    {
        DrawEntity drawEntity = await entityContext.Draws.FindAsync(drawId) ?? throw new Exception("Draw not found");
        return drawEntity;
    }

    public async Task UpdateDraw(Guid drawId)
    {
        DrawEntity drawEntity = await entityContext.Draws.FindAsync(drawId) ?? throw new Exception("Draw not found");
        
    }
    
    public async Task DeleteDraw(Guid drawId)
    {
        DrawEntity drawEntity = await entityContext.Draws.FindAsync(drawId) ?? throw new Exception("Draw not found");
        entityContext.Draws.Remove(drawEntity);
        await entityContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Model.Draw>> GetDraws()
    {
        var draws = await entityContext.Draws.Include(d => d.Periods).AsNoTracking().ToListAsync();
        return draws.Select(Model.Draw.FromObject);
    }

}