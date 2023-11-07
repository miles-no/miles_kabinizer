using kabinizer_data;

namespace kabinizer_api;

public record Draw(Guid Id, DateTime Start, DateTime End, string Title, bool IsSpecial = false)
{
    public static Draw FromObject(DrawEntity o)
    {
        return new Draw(o.Id, o.Start, o.End, o.Title, o.IsSpecial);
    }
}
