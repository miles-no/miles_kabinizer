using kabinizer_api.Dtos.Deadline;
using kabinizer_api.Model;
using kabinizer_api.Services.Deadline;
using kabinizer_data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DeadlineController(EntityContext entityContext, DeadlineService deadlineService)
{
    [HttpGet]
    public IEnumerable<Deadline> GetDeadlines()
    {
        return entityContext.Deadlines.Include(d => d.Periods).Select(Deadline.FromObject);
    }

    [HttpPost]
    public void CreateDeadline([Required] CreateDeadlineDto deadline)
    {
        deadlineService.CreateDeadline(deadline);
    }
}
