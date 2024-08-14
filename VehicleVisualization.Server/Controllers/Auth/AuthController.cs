using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Auth;
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
        public async Task<IActionResult> Register([FromBody] RegisterModel user)
        {
            var result = await _authService.Register(user);
            return result;
        }

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            var result = await _authService.AddRole(role);
            return result;
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole([FromBody] UserRoleModel userRole)
        {
            var result = await _authService.AssignRole(userRole);
            return result;
        }
    }
}