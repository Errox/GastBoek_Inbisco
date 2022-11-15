using Core.DomainModel;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;

namespace Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Comment> Comments { get; set; }

        public override int SaveChanges()
        {
            var changedEntriesCopy = ChangeTracker.Entries()
                        .Where(e => e.State == EntityState.Added ||
                        e.State == EntityState.Modified ||
                        e.State == EntityState.Deleted)
                        .ToList();
            var saveTime = DateTime.Now;

            foreach (var entityEntry in changedEntriesCopy)
            {
                if (entityEntry.Metadata.FindProperty("CreatedDate") != null && entityEntry.Property("CreatedDate").CurrentValue == null)
                {
                    entityEntry.Property("CreatedDate").CurrentValue = saveTime;
                }

                if (entityEntry.Metadata.FindProperty("UpdatedDate") != null)
                {
                    entityEntry.Property("UpdatedDate").CurrentValue = saveTime;
                }
            }
            return base.SaveChanges();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Comment>()
                .HasKey(e => e.Id);

            
        }
    }
}