namespace kabinizer_api.Dtos.Draw;

public class UpdateDrawDto
{
    public required string Id { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public required string Title { get; set; }
    public bool IsSpecial { get; set; }

    public List<UpdatePeriod>? Periods { get; set; }
}
