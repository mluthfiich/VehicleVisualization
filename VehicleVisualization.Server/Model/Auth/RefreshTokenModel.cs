using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Auth
{
	[Keyless]
	public class RefreshTokenModel
	{
		public string Token { get; set; }
		public string RefreshToken { get; set; }
	}
}