using VehicleVisualization.Server.Data;
using VehicleVisualization.Server.Model.Auth;
using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Repositories.MenuPermission
{
    public class MenuPermissionService : IMenuPermissionService
    {
        private readonly AppDatabaseContext _context;

        public MenuPermissionService(AppDatabaseContext context)
        {
            _context = context;
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
    }
}