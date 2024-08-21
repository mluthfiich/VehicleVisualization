using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Auth;
using VehicleVisualization.Server.Model.Management;
using VehicleVisualization.Server.Model.Request;

namespace VehicleVisualization.Server.Repositories.MenuPermission
{
    public interface IMenuPermissionService
    {
        Task<IEnumerable<NavigationMenuModel>> GetMenuItems(string userRoles);
		Task<List<MenuManagementModel>> GetDataRoleMenu();
		Task<List<MenuModel>> GetListMenu();
		Task<IActionResult> AddMenuPermission(MenuPermissionRequestModel model);
		Task<IActionResult> DeleteMenuPermission(int RoleMenuId);
		Task<IActionResult> UpdateMenuPermission(UpdateMenuPermissionModel model);
	}
}