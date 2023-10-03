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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseSqlServer("Server=LAPTOP-89T5L899\\SQLEXPRESS;Database=Kabinizer;Trusted_Connection=True");
    }

    public DbSet<BookingRequestEntity> BookingRequests { get; set; }
    public DbSet<PeriodEntity> Periods { get; set; }


    private void CreateTestData()
    {
        //Periods.Add(new PeriodEntity
        //{
        //    PeriodStart = new DateTime(2024, 01, 01),
        //    PeriodEnd = new DateTime(2024, 03, 01),
        //    DeadlineDate = new DateTime(2023, 12, 31)
        //});

        //SaveChanges();
    }
}
