using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleVisualization.Server.Model.Request;
using VehicleVisualization.Server.Repositories.MenuPermission;

namespace VehicleVisualization.Server.Controllers.MenuPermission
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuPermissionController : ControllerBase
    {
        private readonly IMenuPermissionService _menuPermissionService;
        private readonly UserManager<IdentityUser> _userManager;

        public MenuPermissionController(IMenuPermissionService menuPermissionService, UserManager<IdentityUser> userManager)
        {
            _menuPermissionService = menuPermissionService;
            _userManager = userManager;
        }

        [HttpGet("Permission")]
        [Authorize]
        public async Task<IActionResult> GetMenuItems()
        {
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var user = await _userManager.FindByNameAsync(userId);
			var roles = await _userManager.GetRolesAsync(user);
			var userRole = roles.First();
			var menuItems = await _menuPermissionService.GetMenuItems(userRole);

			return Ok(menuItems);
		}

		[HttpGet("ListMenu")]
		[Authorize]
		public async Task<IActionResult> GetListRole()
		{
			var listMenu = await _menuPermissionService.GetListMenu();

			return Ok(listMenu);
		}

		[HttpGet("ListRoleMenu")]
		[Authorize]
		public async Task<IActionResult> GetListRoleMenu()
		{
			var listRoleMenu = await _menuPermissionService.GetDataRoleMenu();

			return Ok(listRoleMenu);
		}

		[HttpPost("AddMenuPermission")]
		[Authorize]
		public async Task<IActionResult> AddMenuPermission([FromBody] MenuPermissionRequestModel model)
		{
			var result = await _menuPermissionService.AddMenuPermission(model);

			return Ok(result);
		}

		[HttpDelete("DeleteMenuPermission")]
		[Authorize]
		public async Task<IActionResult> DeleteMenuPermission([FromBody] DeleteMenuPermissionModel model)
		{
			var result = await _menuPermissionService.DeleteMenuPermission(model.Fid);

			return Ok(result);
		}

		[HttpPut("UpdateMenuPermission")]
		[Authorize]
		public async Task<IActionResult> UpdateMenuPermission([FromBody] UpdateMenuPermissionModel model)
		{
			var result = await _menuPermissionService.UpdateMenuPermission(model);

			return Ok(result);
		}
	}
}