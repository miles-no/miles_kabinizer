using kabinizer_data;
using kabinizer_data.Entities;

namespace kabinizer_api.Services;

public class TokenService : ITokenService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly EntityContext _entityContext;

    public TokenService(IHttpContextAccessor httpContextAccessor, EntityContext entityContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _entityContext = entityContext;
    }

    public Guid GetUserId()
    {
        var claims = _httpContextAccessor.HttpContext!.User.Claims;
        var objectIdentifier = claims.First(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        var guid = new Guid(objectIdentifier);
        var user = _entityContext.Users.FirstOrDefault(u => u.Id == guid);

        if (user != null)
        {
            return guid;
        }
        
        user = new UserEntity();
        user.Id = guid;
        user.Name = claims.First(c => c.Type == "name").Value;
        _entityContext.Users.Add(user);
        _entityContext.SaveChanges();

        return guid;
    }
}
