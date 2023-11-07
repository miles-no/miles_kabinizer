using kabinizer_data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data;

[Table("Draws")]
public class DrawEntity
{
    public Guid Id { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public required string Title { get; set; }
    public List<PeriodEntity>? Periods { get; set; }
}
