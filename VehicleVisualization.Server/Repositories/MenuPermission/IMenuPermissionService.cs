using VehicleVisualization.Server.Model.Auth;

namespace VehicleVisualization.Server.Repositories.MenuPermission
{
    public interface IMenuPermissionService
    {
        Task<IEnumerable<NavigationMenuModel>> GetMenuItems(string userRoles);
    }
}