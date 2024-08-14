using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Auth;

namespace VehicleVisualization.Server.Repositories.Auth
{
    public interface IAuthService
    {
        Task<IActionResult> Register(RegisterModel model);
        Task<IActionResult> Login(LoginModel model);
        Task<IActionResult> AddRole(string role);
        Task<IActionResult> AssignRole(UserRoleModel model);
		Task<IActionResult> RefreshToken(string token, string refreshToken);
	}
}