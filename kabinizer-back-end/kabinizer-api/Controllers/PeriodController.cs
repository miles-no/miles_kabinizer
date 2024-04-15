using kabinizer_api.Model;
using kabinizer_data;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeriodController(EntityContext entityContext) : ControllerBase
{
    [HttpGet]
    public IEnumerable<Period> GetPeriods()
    {
        // TODO: Remove periods in the past?
        return entityContext.Periods.Select(Period.FromObject);
    }
}