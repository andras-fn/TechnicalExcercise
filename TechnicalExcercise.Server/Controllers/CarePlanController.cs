using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class CarePlanController : ControllerBase
{
    private static List<CarePlan> carePlans = new List<CarePlan>
    {
        //new CarePlan {
        //    Id = Guid.NewGuid(),
        //    Title = "Mr",
        //    PatientName = "John Doe",
        //    UserName = "admin",
        //    ActualStartDateTime = DateTime.Parse("2024-02-03T08:30:00"),
        //    TargetStartDateTime = DateTime.Parse("2024-02-02T09:00:00"),
        //    Reason = "Ankle fracture223",
        //    Action = "Review and address any mobility issues arising from the issue",
        //    Completed = false,
        //    EndDateTime = DateTime.Parse("2024-02-02T11:00:00"),
        //    Outcome = ""
        //}
    };

    [HttpGet]
    public ActionResult<IEnumerable<CarePlan>> GetCarePlans()
    {
        return Ok(carePlans);
    }

    [HttpGet("{id}")]
    public ActionResult<CarePlan> GetCarePlanById(Guid id)
    {
        var carePlan = carePlans.FirstOrDefault(t => t.Id == id);

        if (carePlan == null)
        {
            return NotFound($"Care Plan with Id {id} not found");
        }

        return Ok(carePlan);
    }

    [HttpPost]
    public ActionResult<CarePlan> CreateCarePlan([FromBody] CarePlan carePlan)
    {
        if (carePlan == null)
        {
            return BadRequest("Invalid Care Plan object");
        }

        carePlan.Id = GenerateCarePlanId();
        carePlans.Add(carePlan);

        return CreatedAtAction(nameof(GetCarePlanById), new { id = carePlan.Id }, carePlan);
    }

    [HttpPut("{id}")]
    public ActionResult<CarePlan> UpdateCarePlan(Guid id, [FromBody] CarePlan updatedCarePlan)
    {
        var existingCarePlan = carePlans.FirstOrDefault(t => t.Id == id);

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
    public ActionResult DeleteCarePlan(Guid id)
    {
        var carePlan = carePlans.FirstOrDefault(t => t.Id == id);

        if (carePlan == null)
        {
            return NotFound($"Care Plan with Id {id} not found");
        }

        carePlans.Remove(carePlan);
        return NoContent();
    }

    private Guid GenerateCarePlanId()
    {
        // In a real application, you might want to use a database-generated ID
        return Guid.NewGuid();
    }
}