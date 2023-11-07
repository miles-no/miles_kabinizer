namespace kabinizer_api.Dtos.Draw;

public class CreateDrawDto
{
    public DateTime DeadlineStart { get; set; }
    public DateTime DeadlineEnd { get; set; }
    public required string Title { get; set; }
    public required List<DrawPeriod> DrawPeriods { get; set; }
}
