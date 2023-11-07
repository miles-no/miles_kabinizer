using kabinizer_api.Model;
using kabinizer_data;

namespace kabinizer_api;

public record Draw(Guid Id, DateTime Start, DateTime End, string Title, List<Period>? Periods, bool IsSpecial = false)
{
    public static Draw FromObject(DrawEntity o)
    {
        return new Draw(o.Id, o.DeadlineStart, o.DeadlineEnd, o.Title, o.Periods?.Select(Period.FromObject)?.ToList(), o.IsSpecial);
    }
}
