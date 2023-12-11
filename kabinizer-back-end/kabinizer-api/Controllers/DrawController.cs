using kabinizer_api.Dtos.Draw;
using kabinizer_api.Model;
using kabinizer_api.Services.Draw;
using kabinizer_data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DrawController
{
    private readonly EntityContext entityContext;
    private readonly DrawService drawService;

    public DrawController(EntityContext entityContext, DrawService drawService)
    {
        this.entityContext = entityContext;
        this.drawService = drawService;
    }
    
    [HttpGet]
    public IEnumerable<Draw> GetDraws()
    {
        return entityContext.Draws.Include(d => d.Periods).Select(Draw.FromObject);
    }

    [HttpPost]
    public void CreateDraw([Required] CreateDrawDto draw)
    {
        drawService.CreateDraw(draw);
    }
}
