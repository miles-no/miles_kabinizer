using kabinizer_api.Model;
using kabinizer_data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeriodController : ControllerBase
{
    private readonly EntityContext _entityContext;

    public PeriodController(EntityContext entityContext)
    {
        _entityContext = entityContext;
    }

    [HttpGet]
    public IEnumerable<Period> GetPeriods()
    {
        // TODO: Remove periods in the past?
        return _entityContext.Periods.Select(Period.FromObject);
    }
}