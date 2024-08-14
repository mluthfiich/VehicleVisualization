using VehicleVisualization.Server.Model.Vehicle;

namespace VehicleVisualization.Server.Repositories.Vehicle
{
    public interface IVehicleUnitService
    {
        Task<List<VehicleUnitModel>> VehicleUnit();
        Task<List<VehicleUnitGrowthYoYModel>> VehicleUnitGrowthYoY();
    }
}