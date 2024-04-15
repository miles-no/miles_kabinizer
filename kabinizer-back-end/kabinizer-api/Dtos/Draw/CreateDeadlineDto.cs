namespace kabinizer_api.Dtos.Deadline;

public class CreateDeadlineDto
{
    public DateTime DeadlineStart { get; set; }
    public DateTime DeadlineEnd { get; set; }
    public required string Title { get; set; }
    public required List<DeadlinePeriod> DeadlinePeriods { get; set; }
    public bool IsSpecial { get; set; }
}
