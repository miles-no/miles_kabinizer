﻿using kabinizer_data.Entities;

namespace kabinizer_api;

public class PeriodService
{
    public List<PeriodEntity> CreatePeriods(DateTime start, DateTime end)
    {
        // TODO: Compute periods from a larger time span
        // Week by week?
        return new List<PeriodEntity>();
    }
}