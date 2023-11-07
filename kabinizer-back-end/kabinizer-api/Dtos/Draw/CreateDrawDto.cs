namespace kabinizer_api;

public class CreateDrawDto
{
    public DateTime DrawStart { get; set; }
    public DateTime DrawEnd { get; set; }
    public required string Title { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
}
