using kabinizer_data;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api;

[Route("api/[controller]")]
[ApiController]
public class DrawController
{
    private readonly EntityContext _entityContext;
    public DrawController(EntityContext entityContext)
    {
        _entityContext = entityContext;
    }
    
    [HttpGet]
    public IEnumerable<Draw> GetDraws()
    {
        return _entityContext.Draws.Select(Draw.FromObject);
    }
}
