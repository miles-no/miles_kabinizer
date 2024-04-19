namespace kabinizer_api.Dtos.Draw;

public class UpdatePeriod {

    public required string Id { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public  required string Title { get; set; }

    public required string DrawId { get; set; }
}