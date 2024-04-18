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
public class DrawController(EntityContext entityContext, DrawService drawService) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<Draw>> GetDraws()
    {
        return await drawService.GetDraws();
    }

    [HttpGet("{drawId:guid}")]
    public async Task<DrawEntity> GetDraw([Required] Guid drawId)
    {
        return await drawService.GetDraw(drawId);
    }

    [HttpPost]
    public async Task<ActionResult<DrawEntity>> CreateDraw([Required] CreateDrawDto draw)
    {
        var createdDraw = await drawService.CreateDraw(draw);
        return CreatedAtAction(nameof(GetDraws), new { drawId = createdDraw.Id }, createdDraw);
    }

    [HttpDelete("{drawId:guid}")]
    public async Task<IActionResult> DeleteDraw([Required] Guid drawId)
    {
        await drawService.DeleteDraw(drawId);
        return NoContent();
    }
}