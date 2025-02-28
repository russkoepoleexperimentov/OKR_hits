using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users => Set<User>();

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        // https://www.entityframeworktutorial.net/faq/set-created-and-modified-date-in-efcore.aspx
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.Now;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
