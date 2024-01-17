using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_data;

public class EntityContext : DbContext
{
    public EntityContext(DbContextOptions<EntityContext> options)
        : base(options)
    {
    }

    public DbSet<BookingRequestEntity> BookingRequests { get; set; }
    public DbSet<PeriodEntity> Periods { get; set; }
    public DbSet<DrawEntity> Draws { get; set; }
    public DbSet<UserEntity> Users { get; set; }
}