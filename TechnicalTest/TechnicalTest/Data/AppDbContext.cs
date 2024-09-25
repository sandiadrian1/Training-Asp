using Microsoft.EntityFrameworkCore;
using TechnicalTest.Models;

namespace TechnicalTest.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        public DbSet<Item> Items { get; set; }
        public DbSet<TransaksiItem> TransaksiItems { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public async Task SeedAsync()
        {
            if(! Users.Any())
            {
                var user = new User
                {
                    Username = "admin",
                    PasswordHash = "sandiaja",
                    Role = "Admin"
                };
                Users.Add(user);
                await SaveChangesAsync();
            }
        }

    }
}
