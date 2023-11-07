using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("Period")]
public class PeriodEntity
{
    public Guid Id { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public required string Title { get; set; }

    public required Guid DrawId { get; set; }
    public DrawEntity? Draw { get; set; }

}