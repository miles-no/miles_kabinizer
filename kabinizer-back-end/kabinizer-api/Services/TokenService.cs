using kabinizer_data;
using kabinizer_data.Entities;
using System.Security.Claims;

namespace kabinizer_api.Services;

public class TokenService(IHttpContextAccessor httpContextAccessor, EntityContext entityContext)
    : ITokenService
{
    public Guid GetUserId()
    {
        IEnumerable<Claim> claims = httpContextAccessor.HttpContext!.User.Claims;
        IEnumerable<Claim> enumerable = claims as Claim[] ?? claims.ToArray();
        string objectIdentifier = enumerable
            .First(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        Guid guid = new(objectIdentifier);
        UserEntity? user = entityContext.Users.FirstOrDefault(u => u.Id == guid);

        if (user != null)
        {
            return guid;
        }

        user = new UserEntity { Id = guid, Name = enumerable.First(c => c.Type == "name").Value };
        entityContext.Users.Add(user);
        entityContext.SaveChanges();

        return guid;
    }
}