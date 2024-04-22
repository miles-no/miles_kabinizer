namespace kabinizer_api.Dtos.Period;

public class ReadPeriodDto
{
    public Guid Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Title { get; set; }
}