using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Deadline(Guid Id, DateTime Start, DateTime End, string Title, List<Period>? Periods, bool IsSpecial = false)
{
    public static Deadline FromObject(DeadlineEntity o)
    {
        return new Deadline(o.Id, o.DeadlineStart, o.DeadlineEnd, o.Title, o.Periods?.Select(Period.FromObject)?.OrderBy(p => p.PeriodStart).ToList(), o.IsSpecial);
    }
}
