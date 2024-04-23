using kabinizer_data.Entities;

namespace kabinizer_api.Dtos.Draw;

public class ReadDrawDto
{
    public DateTime DeadlineStart { get; set; }
    public DateTime DeadlineEnd { get; set; }
    public required string Title { get; set; }
    public required List<DrawPeriod> DrawPeriods { get; set; }
    public bool IsSpecial { get; set; }

    internal static object? FromEntity(DrawEntity createdDraw)

    {
        return new ReadDrawDto
        {
            DeadlineStart = createdDraw.DeadlineStart,
            DeadlineEnd = createdDraw.DeadlineEnd,
            Title = createdDraw.Title,
            DrawPeriods = createdDraw.Periods.Select(p => new DrawPeriod
            {
                Start = p.PeriodStart,
                End = p.PeriodEnd,
                Title = p.Title
            }).ToList(),
            IsSpecial = createdDraw.IsSpecial
        };
    }

}
