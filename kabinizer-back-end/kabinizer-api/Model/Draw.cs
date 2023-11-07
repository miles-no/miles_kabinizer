using kabinizer_data;

namespace kabinizer_api;

public record Draw(Guid Id, DateTime Start, DateTime End, string Title)
{
    public static Draw FromObject(DrawEntity o)
    {
        return new Draw(o.Id, o.Start, o.End, o.Title);
    }
}
