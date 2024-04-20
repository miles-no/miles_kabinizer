using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record User(Guid Id, string? Name)
{
    public static User FromEntity(UserEntity u)
    {
        return new User(u.Id, u.Name);
    }
}