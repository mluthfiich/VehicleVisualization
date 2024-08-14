using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VehicleVisualization.Server.Model.Auth;
using VehicleVisualization.Server.Model.Vehicle;

namespace VehicleVisualization.Server.Data
{
    public class AppDatabaseContext : IdentityDbContext<IdentityUser>
    {
        public AppDatabaseContext(DbContextOptions options) : base(options) { }

		public DbSet<RefreshTokenModel> RefreshTokens { get; set; }
		public DbSet<NavigationMenuModel> NavigationMenus { get; set; }
        public DbSet<RoleMenuPermissionModel> RoleMenuPermissions { get; set; }
        public DbSet<VehicleUnitModel> VehicleUnits { get; set; }
        public DbSet<VehicleUnitGrowthYoYModel> VehicleUnitGrowthYoYs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityUser>().ToTable("TB_M_USER");
            modelBuilder.Entity<IdentityRole>().ToTable("TB_M_ROLES");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("TB_M_USER_ROLES");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("TB_M_USER_CLAIMS");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("TB_M_USER_LOGINS");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("TB_M_USER_TOKENS");
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("TB_M_ROLE_CLAIMS");

			modelBuilder.Entity<VehicleUnitGrowthYoYModel>()
		    .Property(v => v.BusYoY)
		    .HasColumnType("decimal(18,2)");

			modelBuilder.Entity<VehicleUnitGrowthYoYModel>()
			.Property(v => v.CarYoY)
			.HasColumnType("decimal(18,2)");

			modelBuilder.Entity<VehicleUnitGrowthYoYModel>()
			.Property(v => v.MotorCycleYoY)
			.HasColumnType("decimal(18,2)");

			modelBuilder.Entity<VehicleUnitGrowthYoYModel>()
			.Property(v => v.TruckYoY)
			.HasColumnType("decimal(18,2)");

			modelBuilder.Entity<VehicleUnitGrowthYoYModel>()
			.Property(v => v.TotalUnitYoY)
			.HasColumnType("decimal(18,2)");
		}
	}
}