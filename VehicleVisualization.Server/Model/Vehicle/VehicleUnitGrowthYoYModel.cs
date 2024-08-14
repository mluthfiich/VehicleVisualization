using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Vehicle
{
    [Keyless]
    public class VehicleUnitGrowthYoYModel
    {
        public string? Year { get; set; }
        public long? TotalBus { get; set; }
        public long? TotalCar { get; set; }
        public long? TotalMotorCycle { get; set; }
        public long? TotalTruck { get; set; }
        public long? TotalUnit { get; set; }
        public decimal? BusYoY { get; set; }
        public decimal? CarYoY { get; set; }
        public decimal? MotorCycleYoY { get; set; }
        public decimal? TruckYoY { get; set; }
        public decimal? TotalUnitYoY { get; set; }
    }
}