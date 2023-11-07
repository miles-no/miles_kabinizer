using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("Draw")]
public class DrawEntity
{
    public Guid Id { get; set; }
    public DateTime DeadlineStart { get; set; }
    public DateTime DeadlineEnd { get; set; }
    public required string Title { get; set; }
    public bool IsSpecial { get; set; }
    public List<PeriodEntity>? Periods { get; set; }
}
