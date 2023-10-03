using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Period(DateTime PeriodStart, DateTime PeriodEnd, DateTime DeadlineDate)
{
    public static Period FromObject(PeriodEntity o)
    {
        return new Period(o.PeriodStart, o.PeriodEnd, o.DeadlineDate);
    }
}