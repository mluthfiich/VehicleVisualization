using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Vehicle
{
    [Keyless]
    public class VehicleUnitGrowthYoYModel
    {
        public string? Year { get; set; }
        public long? BusYear { get; set; }
        public long? CarYear { get; set; }
        public long? MotorCycleYear { get; set; }
        public long? TruckYear { get; set; }
        public long? TotalUnitYear { get; set; }
        public decimal? BusYoY { get; set; }
        public decimal? CarYoY { get; set; }
        public decimal? MotorCycleYoY { get; set; }
        public decimal? TruckYoY { get; set; }
        public decimal? TotalUnitYoY { get; set; }
    }
}