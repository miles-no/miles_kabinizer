using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Period(Guid Id, DateTime PeriodStart, DateTime PeriodEnd, string Title)
{
    public static Period FromObject(PeriodEntity o)
    {
        return new Period(o.Id, o.PeriodStart, o.PeriodEnd, o.Title);
    }
}