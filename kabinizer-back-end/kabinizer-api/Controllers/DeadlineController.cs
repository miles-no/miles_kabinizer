using kabinizer_api.Model;
using kabinizer_data;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DeadlineController : ControllerBase
{
    private readonly EntityContext _entityContext;

    public DeadlineController(EntityContext entityContext)
    {
        _entityContext = entityContext;
    }

    [HttpGet]
    public IEnumerable<Deadline> GetDeadlines()
    {
        // TODO: Remove past deadline dates
        return _entityContext.Deadlines.Select(Deadline.FromObject);
    }
}