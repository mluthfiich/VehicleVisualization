using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
            var cacheKey = "VehicleUnitRedis";

            var cachedVehicles = await _redisCacheService.GetCacheValueAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedVehicles))
            {
                var deserializedVehicles = JsonConvert.DeserializeObject<List<VehicleUnitModel>>(cachedVehicles);
                if (deserializedVehicles != null)
                {
                    return deserializedVehicles;
                }
            }

            var vehicles = await _context.VehicleUnits
                .FromSqlInterpolated($"EXEC spGetDataVehicleUnit")
                .AsNoTracking()
                .ToListAsync();

            if (vehicles != null && vehicles.Any())
            {
                await _redisCacheService.SetCacheValueAsync(cacheKey, JsonConvert.SerializeObject(vehicles));
            }

            return vehicles ?? new List<VehicleUnitModel>();
        }

        public async Task<List<VehicleUnitGrowthYoYModel>> VehicleUnitGrowthYoY()
        {
            var cacheKey = "VehicleUnitYoYRedis";

            var cachedVehicles = await _redisCacheService.GetCacheValueAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedVehicles))
            {
                var deserializedVehicles = JsonConvert.DeserializeObject<List<VehicleUnitGrowthYoYModel>>(cachedVehicles);
                if (deserializedVehicles != null)
                {
                    return deserializedVehicles;
                }
            }

            var vehicles = await _context.VehicleUnitGrowthYoYs
                .FromSqlInterpolated($"EXEC spGetDataVehicleUnitGrowthYoY")
                .AsNoTracking()
                .ToListAsync();

            if (vehicles != null && vehicles.Any())
            {
                await _redisCacheService.SetCacheValueAsync(cacheKey, JsonConvert.SerializeObject(vehicles));
            }

            return vehicles ?? new List<VehicleUnitGrowthYoYModel>();
        }
    }
}