using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Auth;
using VehicleVisualization.Server.Model.Request;
using VehicleVisualization.Server.Repositories.Auth;

namespace VehicleVisualization.Server.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel user)
        {
            var result = await _authService.Login(user);
            return result;
        }

		[HttpPost("RefreshToken")]
		public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenModel model)
		{
			var result = await _authService.RefreshToken(model.Token, model.RefreshToken);
			return result;
		}

		[HttpPost("Register")]
		[Authorize]
		public async Task<IActionResult> Register([FromBody] RegisterModel user)
        {
            var result = await _authService.Register(user);
            return result;
        }

        [HttpPost("AddRole")]
		[Authorize]
		public async Task<IActionResult> AddRole([FromBody] RoleRequestModel model)
        {
            var result = await _authService.AddRole(model.Role);
            return result;
        }

        [HttpPost("AssignRole")]
		[Authorize]
		public async Task<IActionResult> AssignRole([FromBody] UserRoleModel userRole)
        {
            var result = await _authService.AssignRole(userRole);
            return result;
        }

		[HttpGet("ListUser")]
		[Authorize]
		public async Task<IActionResult> GetListUser()
		{
			var listRole = await _authService.GetListUser();

			return Ok(listRole);
		}

		[HttpGet("ListRole")]
		[Authorize]
		public async Task<IActionResult> GetListRole()
		{
			var listRole = await _authService.GetListRole();

			return Ok(listRole);
		}

		[HttpGet("ListUserRole")]
		[Authorize]
		public async Task<IActionResult> GetListUserRole()
		{
			var listUser = await _authService.GetListUserRole();

			return Ok(listUser);
		}

		[HttpDelete("DeleteUserRole")]
		[Authorize]
		public async Task<IActionResult> DeleteMenuPermission(UserRoleModel model)
		{
			var result = await _authService.DeleteAccount(model);

			return Ok(result);
		}

		[HttpPut("UpdateUserRole")]
		[Authorize]
		public async Task<IActionResult> UpdateMenuPermission(UserRoleModel model)
		{
			var result = await _authService.UpdateAccount(model);

			return Ok(result);
		}
	}
}