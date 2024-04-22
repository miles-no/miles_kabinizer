using kabinizer_api.Dtos.Draw;
using kabinizer_api.Services.Period;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_api.Services.Draw;

public class DrawService(EntityContext entityContext, PeriodService periodService)
{
    /**
     * Create a draw
     */
    public async Task<DrawEntity> CreateDraw(CreateDrawDto draw)
    {
        Guid drawId = Guid.NewGuid();
        var drawEntity = new DrawEntity
        {
            Id = drawId,
            DeadlineStart = draw.DeadlineStart,
            DeadlineEnd = draw.DeadlineEnd,
            Title = draw.Title,
            Periods = periodService.CreatePeriods(drawId, draw.DrawPeriods),
            IsSpecial = draw.IsSpecial
        };
        entityContext.Draws.Add(drawEntity);
        await entityContext.SaveChangesAsync();
        return drawEntity;
    }

    /**
     * Get a draw
     */
    public async Task<DrawEntity> GetDraw(Guid drawId)
    {
        DrawEntity drawEntity = await entityContext.Draws.FindAsync(drawId) ?? throw new Exception("Draw not found");
        return drawEntity;
    }

    /**
     * Update a draw
     */
    public Task UpdateDraw(Guid drawId)
    {
        throw new NotImplementedException();
    }

    /**
     * Delete a draw
     */
    public async Task DeleteDraw(Guid drawId)
    {
        DrawEntity drawEntity = await entityContext.Draws.FindAsync(drawId) ?? throw new Exception("Draw not found");
        entityContext.Draws.Remove(drawEntity);
        await entityContext.SaveChangesAsync();
    }

    /**
     * Get all draws
     */
    public async Task<IEnumerable<Model.Draw>> GetDraws()
    {
        var draws = await entityContext.Draws.Include(d => d.Periods).AsNoTracking().ToListAsync();
        return draws.Select(Model.Draw.FromObject);
    }

    /**
     * Get draws that are currently open for booking
     */
    public async Task<IEnumerable<Model.Draw>> GetCurrentDraws()
    {
        var draws = await entityContext.Draws
            .Include(d => d.Periods)
            .Where(d => d.DeadlineStart <= DateTime.Now && d.DeadlineEnd >= DateTime.Now)
            .AsNoTracking()
            .ToListAsync();
        return draws.Select(Model.Draw.FromObject);
    }

    /**
     * Get draws that not yet open for booking but will be in the future
     */
    public async Task<IEnumerable<Model.Draw>> GetUpcomingDraws()
    {
        var draws = await entityContext.Draws
            .Include(d => d.Periods)
            .Where(d => d.DeadlineStart > DateTime.Now)
            .AsNoTracking()
            .ToListAsync();
        return draws.Select(Model.Draw.FromObject);
    }

    /**
     * Get draws that have ended and are no longer open for booking
     */
    public async Task<IEnumerable<Model.Draw>> GetPastDraws()
    {
        var draws = await entityContext.Draws
            .Include(d => d.Periods)
            .Where(d => d.DeadlineEnd < DateTime.Now)
            .AsNoTracking()
            .ToListAsync();
        return draws.Select(Model.Draw.FromObject);
    }
}