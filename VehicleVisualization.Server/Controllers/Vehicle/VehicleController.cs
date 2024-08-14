using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleVisualization.Server.Model.Vehicle;
using VehicleVisualization.Server.Repositories.Vehicle;

namespace VehicleVisualization.Server.Controllers.Vehicle
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleUnitService _vehicleUnitService;

        public VehicleController(IVehicleUnitService vehicleUnitService)
        {
            _vehicleUnitService = vehicleUnitService;
        }

        [HttpGet("units", Name = "VehicleUnit")]
        public async Task<ActionResult<IEnumerable<VehicleUnitModel>>> GetVehicleUnit()
        {
            var vehicles = await _vehicleUnitService.VehicleUnit();
            if (vehicles == null || vehicles.Count == 0)
            {
                return NotFound("No vehicle units found.");
            }
            return Ok(vehicles);
        }

        [HttpGet("growthyoy", Name = "GrowthVehicleUnitYoY")]
        public async Task<ActionResult<IEnumerable<VehicleUnitGrowthYoYModel>>> GetVehicleUnitYoY()
        {
            var vehicles = await _vehicleUnitService.VehicleUnitGrowthYoY();
            if (vehicles == null || vehicles.Count == 0)
            {
                return NotFound("No vehicle unit growth data found.");
            }
            return Ok(vehicles);
        }
    }
}