using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record Period(Guid Id, DateTime PeriodStart, DateTime PeriodEnd, string Title, Guid DrawId)
{
    public Period(DateTime periodStart, DateTime periodEnd, string title, Guid DrawId) 
        : this(Guid.NewGuid(), periodStart, periodEnd, title, DrawId)
    {
    }

    public static Period FromObject(PeriodEntity o)
    {
        return new Period(o.Id, o.PeriodStart, o.PeriodEnd, o.Title, o.DrawId);
    }

    public PeriodEntity ToObject() {
        return new PeriodEntity {
            Id = Id,
            PeriodStart = PeriodStart,
            PeriodEnd = PeriodEnd,
            Title = Title,
            DrawId = DrawId
        };
    }
}