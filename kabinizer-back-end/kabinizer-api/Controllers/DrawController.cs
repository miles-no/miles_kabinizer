using kabinizer_data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api;

[Route("api/[controller]")]
[ApiController]
public class DrawController
{
    private readonly EntityContext _entityContext;
    private readonly DrawService _drawService;
    public DrawController(EntityContext entityContext, DrawService drawService)
    {
        _entityContext = entityContext;
        _drawService = drawService;
    }
    
    [HttpGet]
    public IEnumerable<Draw> GetDraws()
    {
        return _entityContext.Draws.Include(d => d.Periods).Select(Draw.FromObject);
    }

    [HttpPost]
    public void CreateDraw([Required] CreateDrawDto draw)
    {
        _drawService.CreateDraw(draw);
    }
}
