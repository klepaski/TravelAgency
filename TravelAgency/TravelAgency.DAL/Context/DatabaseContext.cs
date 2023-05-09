using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Context
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Orderr> Orderrs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<BelTour> BelTours { get; set; }
       // public DbSet<Image> Images { get; set; }
    }
}
