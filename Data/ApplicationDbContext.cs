using Core.DomainModel;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;

namespace Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        //private UserManager<ApplicationUser> _userManager;
        public ApplicationDbContext(
            DbContextOptions options, 
            IOptions<OperationalStoreOptions> operationalStoreOptions
            //UserManager<ApplicationUser> userManager
            )
            : base(options, operationalStoreOptions)
        {
            //_userManager = userManager;
        }

        public DbSet<Comment> Comments { get; set; }

        public override int SaveChanges()
        {
            OnBeforeSaving();
            return base.SaveChanges();
        }

        private void OnBeforeSaving()
        {
            var entries = ChangeTracker.Entries();
            var utcNow = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                // It would've been nicer if the baseEntity could've been inhirithed by all classes so
                // instead of cheacking it's a comment or application we can always use it.
                // For now, this is easier to only have it specifically for those that have CreatedDate and UpdatedDate
                // set UpdatedDate / CreatedDate appropriately
                // Create a cheack on comment
                if (entry.Entity is Comment trackable)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            // set the updated date to "now"
                            trackable.UpdatedDate = utcNow;

                            // mark property as "don't touch"
                            // we don't want to update on a Modify operation
                            entry.Property("CreatedDate").IsModified = false;
                            break;

                        case EntityState.Added:
                            // set both updated and created date to "now"
                            trackable.CreatedDate = utcNow;
                            trackable.UpdatedDate = utcNow;
                            break;
                    }
                }

                // Create a check on applicationUser
                if (entry.Entity is ApplicationUser user)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            // set the updated date to "now"
                            user.UpdatedDate = utcNow;

                            // mark property as "don't touch"
                            // we don't want to update on a Modify operation
                            entry.Property("CreatedDate").IsModified = false;
                            break;

                        case EntityState.Added:
                            // set both updated and created date to "now"
                            user.CreatedDate = utcNow;
                            user.UpdatedDate = utcNow;
                            break;
                    }
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            

            // Seeding
        }
    }
}