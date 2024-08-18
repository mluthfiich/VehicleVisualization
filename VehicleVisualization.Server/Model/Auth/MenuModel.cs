using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Auth
{
	[Keyless]
	public class MenuModel
	{
		public string? Fid { get; set; }
		public string? MenuName { get; set; }
		public string? ParentMenuId { get; set; }
		public string? ActionName { get; set; }
		public int Position { get; set; }
	}
}