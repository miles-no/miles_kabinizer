using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Deadline(DateOnly PeriodStart, DateOnly PeriodEnd, DateOnly DeadlineTime)
{
    public static Deadline FromObject(DeadlineEntity o)
    {
        return new Deadline(o.PeriodStart, o.PeriodEnd, o.DeadlineDate);
    }
}