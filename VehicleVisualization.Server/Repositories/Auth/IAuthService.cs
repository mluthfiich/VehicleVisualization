using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Auth;
using VehicleVisualization.Server.Model.Management;

namespace VehicleVisualization.Server.Repositories.Auth
{
    public interface IAuthService
    {
        Task<IActionResult> Register(RegisterModel model);
        Task<IActionResult> Login(LoginModel model);
        Task<IActionResult> AddRole(string role);
        Task<IActionResult> AssignRole(UserRoleModel model);
		Task<IActionResult> RefreshToken(string token, string refreshToken);
		Task<List<UserModel>> GetListUser();
		Task<List<RoleModel>> GetListRole();
		Task<List<UserManagementModel>> GetListUserRole();
		Task<bool> DeleteAccount(UserRoleModel model);
		Task<IActionResult> UpdateAccount(UserRoleModel model);
	}
}