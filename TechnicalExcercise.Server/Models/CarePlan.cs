using System;
using System.ComponentModel.DataAnnotations;

public class CarePlan
{
	// use a Guid for a unique id
	public Guid Id { get; set; }

	[Required(ErrorMessage = "Title is required")]
	[StringLength(450)] // title should have a maxlength of 450 (nvarchar(450))
	public string Title { get; set; }

	[Required(ErrorMessage = "Patient Name is required")]
	[StringLength(450)] // patient name should have a maxlength of 450 (nvarchar(450))
	public string PatientName { get; set; }

	[Required(ErrorMessage = "User Name is required")]
	[StringLength(450)] // user name should have a maxlength of 450 (nvarchar(450))
	public string UserName { get; set; }

	[Required(ErrorMessage = "Actual Start DateTime is required")]
	public DateTime? ActualStartDateTime { get; set; }

	[Required(ErrorMessage = "Target Start DateTime is required")]
	public DateTime? TargetStartDateTime { get; set; }

	[Required(ErrorMessage = "Reason is required")]
	[StringLength(1000)] // reason should have a maxlength of 1000 (nvarchar(1000))
	public string Reason { get; set; }

	[Required(ErrorMessage = "Action is required")]
	[StringLength(1000)] // action should have a maxlength of 1000 (nvarchar(1000))
	public string Action { get; set; }

	public bool Completed { get; set; }

	public DateTime? EndDateTime { get; set; }

	[StringLength(1000)] // outcome should have a maxlength of 1000 (nvarchar(1000))
	public string? Outcome { get; set; } 

	public CarePlan()
	{
		// generate a new id every time a new instance of this model is created
		Id = Guid.NewGuid();
	}
}