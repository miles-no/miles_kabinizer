namespace kabinizer_api.Services;

public class TokenService : ITokenService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TokenService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid GetUserId()
    {
        var guid = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        return new Guid(guid);
    }
}
