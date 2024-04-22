using kabinizer_api.Dtos.Draw;
using kabinizer_api.Model;
using kabinizer_api.Services.Draw;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DrawController(DrawService drawService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Draw>>> GetDraws()
    {
        return Ok(await drawService.GetDraws());
    }
    
    [HttpGet("current")]
    public async Task<ActionResult<IEnumerable<Draw>>> GetCurrentDraws()
    {
        return Ok(await drawService.GetCurrentDraws());
    }
    
    [HttpGet("upcoming")]
    public async Task<ActionResult<IEnumerable<Draw>>> GetUpcomingDraws()
    {
        return Ok(await drawService.GetUpcomingDraws());
    }
    
    [HttpGet("past")]
    public async Task<ActionResult<IEnumerable<Draw>>> GetPastDraws()
    {
        return Ok(await drawService.GetPastDraws());
    }

    [HttpGet("{drawId:guid}")]
    public async Task<ActionResult<DrawEntity>> GetDraw([Required] Guid drawId)
    {
        return Ok(await drawService.GetDraw(drawId));
    }

    [HttpPost]
    public async Task<ActionResult<DrawEntity>> CreateDraw([Required] CreateDrawDto draw)
    {
        var createdDraw = await drawService.CreateDraw(draw);
        return CreatedAtAction(nameof(GetDraws), new { drawId = createdDraw.Id }, createdDraw);
    }

  
    [HttpPut]

    public IActionResult UpdateDraw([Required] UpdateDrawDto draw)
    {
        try
        {
            drawService.UpdateDraw(draw);
            return new NoContentResult();
        }
        catch (Exception)
        {
            return new NotFoundResult();
        }
    }

    [HttpDelete("{drawId:guid}")]
    public async Task<IActionResult> DeleteDraw([Required] Guid drawId)
    {
        await drawService.DeleteDraw(drawId);
        return NoContent();
    }

}