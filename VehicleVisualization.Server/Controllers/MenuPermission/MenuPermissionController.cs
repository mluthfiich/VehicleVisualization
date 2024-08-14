using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

            var menuItems = await _menuPermissionService.GetMenuItems(userId);

            return Ok(menuItems);
        }
    }
}