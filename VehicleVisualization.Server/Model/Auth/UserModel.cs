using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Auth
{
	[Keyless]
	public class UserModel
	{
		public string? UserId { get; set; }
		public string? UserName { get; set; }
		public string? Email { get; set; }
	}
}