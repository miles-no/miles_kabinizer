using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Draw(Guid Id, DateTime Start, DateTime End, string Title, List<Period>? Periods, bool IsSpecial = false)
{
    public static Draw FromObject(DrawEntity o)
    {
        return new Draw(o.Id, o.DeadlineStart, o.DeadlineEnd, o.Title, o.Periods?.Select(Period.FromObject)?.OrderBy(p => p.PeriodStart).ToList(), o.IsSpecial);
    }
}
