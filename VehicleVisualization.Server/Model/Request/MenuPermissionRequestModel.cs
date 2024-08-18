using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Request
{
	[Keyless]
	public class MenuPermissionRequestModel
	{
		public string? RoleId { get; set; }
		public string? MenuId { get; set; }
	}

	[Keyless]
	public class UpdateMenuPermissionModel
	{
		public string? Fid { get; set; }
		public string? MenuId { get; set; }
		public string? RoleId { get; set; }
	}
}