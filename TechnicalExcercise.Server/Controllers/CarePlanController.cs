using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechnicalExcercise.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarePlanController : ControllerBase
    {
        // use in memory list - no db connection
        public static List<CarePlan> CarePlans { get; } = new List<CarePlan>();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarePlan>>> GetCarePlans()
        {
            return Ok(await Task.FromResult(CarePlans));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarePlan>> GetCarePlanById(Guid id)
        {
            var carePlan = await Task.FromResult(CarePlans.FirstOrDefault(t => t.Id == id));

            if (carePlan == null)
            {
                return NotFound($"Care Plan with Id {id} not found");
            }

            return Ok(carePlan);
        }

        [HttpPost]
        public async Task<ActionResult<CarePlan>> CreateCarePlan([FromBody] CarePlan carePlan)
        {
            if (carePlan == null)
            {
                return BadRequest("Invalid Care Plan object");
            }

            carePlan.Id = GenerateCarePlanId();
            CarePlans.Add(carePlan);

            return CreatedAtAction(nameof(GetCarePlanById), new { id = carePlan.Id }, carePlan);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CarePlan>> UpdateCarePlan(Guid id, [FromBody] CarePlan updatedCarePlan)
        {
            var existingCarePlan = CarePlans.FirstOrDefault(t => t.Id == id);

            if (existingCarePlan == null)
            {
                return NotFound($"Care Plan with Id {id} not found");
            }

            existingCarePlan.Title = updatedCarePlan.Title;
            existingCarePlan.PatientName = updatedCarePlan.PatientName;
            existingCarePlan.UserName = updatedCarePlan.UserName;
            existingCarePlan.ActualStartDateTime = updatedCarePlan.ActualStartDateTime;
            existingCarePlan.TargetStartDateTime = updatedCarePlan.TargetStartDateTime;
            existingCarePlan.Reason = updatedCarePlan.Reason;
            existingCarePlan.Action = updatedCarePlan.Action;
            existingCarePlan.Completed = updatedCarePlan.Completed;
            existingCarePlan.EndDateTime = updatedCarePlan.EndDateTime;
            existingCarePlan.Outcome = updatedCarePlan.Outcome;

            return Ok(existingCarePlan);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCarePlan(Guid id)
        {
            var carePlan = CarePlans.FirstOrDefault(t => t.Id == id);

            if (carePlan == null)
            {
                return NotFound($"Care Plan with Id {id} not found");
            }

            CarePlans.Remove(carePlan);
            return NoContent();
        }

        private Guid GenerateCarePlanId()
        {
            return Guid.NewGuid();
        }
    }
}
