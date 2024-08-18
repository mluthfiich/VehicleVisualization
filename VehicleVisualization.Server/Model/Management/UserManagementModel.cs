using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Management
{
	[Keyless]
	public class UserManagementModel
	{
		public string? UserId { get; set; }
		public string? RoleId { get; set; }
		public string? UserName { get; set; }
		public string? RoleName { get; set; }
		public string? Email { get; set; }
	}
}