using Microsoft.EntityFrameworkCore;

namespace VehicleVisualization.Server.Model.Vehicle
{
    [Keyless]
    public class VehicleUnitModel
    {
        public string? Year { get; set; }
        public string? Province { get; set; }
        public long? Bus { get; set; }
        public long? Car { get; set; }
        public long? MotorCycle { get; set; }
        public long? Truck { get; set; }
        public long? TotalUnit { get; set; }
    }
}