using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Period(DateOnly PeriodStart, DateOnly PeriodEnd, DateOnly DeadlineDate)
{
    public static Period FromObject(PeriodEntity o)
    {
        return new Period(o.PeriodStart, o.PeriodEnd, o.DeadlineDate);
    }
}