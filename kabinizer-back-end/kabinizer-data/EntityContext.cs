using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_data;

public class EntityContext : DbContext
{
    public EntityContext(DbContextOptions<EntityContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseSqlServer("Server=LAPTOP-89T5L899\\SQLEXPRESS;Database=Kabinizer;Trusted_Connection=True");
    }

    public DbSet<BookingRequestEntity> BookingRequests { get; set; }
    public DbSet<PeriodEntity> Periods { get; set; }
}