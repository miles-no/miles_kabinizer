namespace kabinizer_api.Dtos.Period;

public class UpdatePeriodDto
{
    public Guid Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}