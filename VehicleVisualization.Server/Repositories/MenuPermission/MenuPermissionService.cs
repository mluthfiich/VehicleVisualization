using VehicleVisualization.Server.Data;
using VehicleVisualization.Server.Model.Auth;
using Microsoft.EntityFrameworkCore;
using VehicleVisualization.Server.Model.Management;
using VehicleVisualization.Server.Repositories.Redis;
using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Request;

namespace VehicleVisualization.Server.Repositories.MenuPermission
{
    public class MenuPermissionService : IMenuPermissionService
    {
        private readonly AppDatabaseContext _context;
		private readonly IRedisCacheService _redisCacheService;

		public MenuPermissionService(AppDatabaseContext context, IRedisCacheService redisCacheService)
        {
            _context = context;
			_redisCacheService = redisCacheService;
        }

        public async Task<IEnumerable<NavigationMenuModel>> GetMenuItems(string userRoles)
        {
            var rolesString = string.Join(",", userRoles);

            var menuItems = await _context.NavigationMenus
                .FromSqlInterpolated($"EXEC spGetDataRoleMenuPermission {rolesString}")
                .AsNoTracking()
                .ToListAsync();

            return menuItems;
        }

		public async Task<List<MenuManagementModel>> GetDataRoleMenu()
		{
			var listMenu = await _context.MenuManagements
				.FromSqlInterpolated($"EXEC spGetDataRoleMenu")
				.AsNoTracking()
				.ToListAsync();

			return listMenu;
		}

		public async Task<List<MenuModel>> GetListMenu()
		{
			var listMenu = await _context.Menus
				.FromSqlInterpolated($"EXEC spGetDataMenu")
				.AsNoTracking()
				.ToListAsync();

			return listMenu;
		}

		public async Task<IActionResult> AddMenuPermission(MenuPermissionRequestModel model)
		{
			try
			{
				var addMenuPermission = await _context.Database.ExecuteSqlInterpolatedAsync($"EXEC spInsertDataMenuPermission {model.RoleId}, {model.MenuId}");
				return new OkObjectResult(new { message = "Menu Permission added successfully" });
			}
			catch (Exception ex)
			{
				return new BadRequestObjectResult(ex);
			}
		}

		public async Task<IActionResult> DeleteMenuPermission(int RoleMenuId)
		{
			try
			{
				var addMenuPermission = await _context.Database.ExecuteSqlInterpolatedAsync($"EXEC spDeleteDataMenuPermission {RoleMenuId}");
				return new OkObjectResult(new { message = "Menu Permission deleted successfully" });
			}
			catch (Exception ex)
			{
				return new BadRequestObjectResult(ex);
			}
		}

		public async Task<IActionResult> UpdateMenuPermission(UpdateMenuPermissionModel model)
		{
			try
			{
				var addMenuPermission = await _context.Database.ExecuteSqlInterpolatedAsync($"EXEC spUpdateDataMenuPermission {model.Fid}, {model.MenuId}, {model.RoleId}");
				return new OkObjectResult(new { message = "Menu Permission updated successfully" });
			}
			catch (Exception ex)
			{
				return new BadRequestObjectResult(ex);
			}
		}
	}
}