﻿using kabinizer_api.Model;
using kabinizer_data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PeriodController : ControllerBase
{
    private readonly EntityContext entityContext;

    public PeriodController(EntityContext entityContext)
    {
        this.entityContext = entityContext;
    }

    [HttpGet]
    public IEnumerable<Period> GetPeriods()
    {
        // TODO: Remove periods in the past?
        return entityContext.Periods.Select(Period.FromObject);
    }
}