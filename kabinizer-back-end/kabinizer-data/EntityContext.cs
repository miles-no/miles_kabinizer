using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_data;

public class EntityContext : DbContext
{
    public EntityContext(DbContextOptions<EntityContext> options)
        : base(options)
    {
        // TODO: to be replaced
        CreateTestData();
    }

    public DbSet<PeriodEntity> Periods { get; set; }

    private void CreateTestData()
    {
        Periods.Add(new PeriodEntity
        {
            PeriodStart = new DateOnly(2024, 01, 01),
            PeriodEnd = new DateOnly(2024, 03, 01),
            DeadlineDate = new DateOnly(2023, 12, 31)
        });

        SaveChanges();
    }
}
