using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("Period")]
public class PeriodEntity
{
    public Guid Id { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public DateTime DeadlineDate { get; set; }
    public bool IsSpecialPeriod { get; set; }
    public string Title { get; set; }
}