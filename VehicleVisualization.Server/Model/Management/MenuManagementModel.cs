using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Management
{
	[Keyless]
	public class MenuManagementModel
	{
		public string? FidMenu { get; set; }
		public string? MenuName { get; set; }
		public int FidMenuPermission { get; set; }
		public string? RoleId { get; set; }
		public string? RoleName { get; set; }
	}
}