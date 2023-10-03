namespace kabinizer_data.Entities;

public class DeadlineEntity
{
    public Guid Id { get; set; }
    public DateOnly PeriodStart { get; set; }
    public DateOnly PeriodEnd { get; set; }
    public DateOnly DeadlineDate { get; set; }
    public bool IsSpecialPeriod { get; set; }
}