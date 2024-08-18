using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VehicleVisualization.Server.Data;
using VehicleVisualization.Server.Model.Vehicle;
using VehicleVisualization.Server.Repositories.Redis;

namespace VehicleVisualization.Server.Repositories.Vehicle
{
    public class VehicleUnitService : IVehicleUnitService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDatabaseContext _context;
        private readonly IRedisCacheService _redisCacheService;

        public VehicleUnitService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            AppDatabaseContext context,
            IRedisCacheService redisCacheService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _redisCacheService = redisCacheService;
        }

        public async Task<List<VehicleUnitModel>> VehicleUnit()
        {
            var vehicles = await _context.VehicleUnits
                .FromSqlInterpolated($"EXEC spGetDataVehicleUnit")
                .AsNoTracking()
                .ToListAsync();

			return vehicles;
        }

        public async Task<List<VehicleUnitGrowthYoYModel>> VehicleUnitGrowthYoY()
        {
            var vehicles = await _context.VehicleUnitGrowthYoYs
                .FromSqlInterpolated($"EXEC spGetDataVehicleUnitGrowthYoY")
                .AsNoTracking()
                .ToListAsync();

			return vehicles;
        }
    }
}