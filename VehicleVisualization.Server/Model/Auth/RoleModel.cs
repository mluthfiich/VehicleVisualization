using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Auth
{
	[Keyless]
	public class RoleModel
	{
		public string? RoleName { get; set; }

		public string? RoleId { get; set; }
	}
}