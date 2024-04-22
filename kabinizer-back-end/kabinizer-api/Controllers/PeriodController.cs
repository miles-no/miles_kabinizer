using kabinizer_api.Dtos.Period;
using kabinizer_api.Model;
using kabinizer_api.Services.Period;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeriodController(PeriodService periodService) : ControllerBase
{
    [HttpGet("{periodId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ReadPeriodDto>> GetPeriod([FromRoute] Guid periodId)
    {
        var period = await periodService.GetPeriod(periodId);
        if (period == null) return NotFound();

        var readPeriodDto = new ReadPeriodDto
        {
            Id = period.Id, StartDate = period.PeriodStart, EndDate = period.PeriodEnd, Title = period.Title,
        };

        return Ok(readPeriodDto);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Period>>> GetCurrentPeriods()
    {
        var currentPeriods = await periodService.GetCurrentPeriods();
        return Ok(currentPeriods.Select(Period.FromObject));
    }

    [HttpGet("upcoming")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Period>>> GetUpcomingPeriods()
    {
        var periods = await periodService.GetUpcomingPeriods();
        return Ok(periods.Select(Period.FromObject));
    }

    [HttpGet("past")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Period>>> GetPastPeriods()
    {
        var periods = await periodService.GetPastPeriods();
        return Ok(periods.Select(Period.FromObject));
    }

    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Period>>> GetAllPeriods()
    {
        var periods = await periodService.GetAllPeriods();
        return Ok(periods.Select(Period.FromObject));
    }
}