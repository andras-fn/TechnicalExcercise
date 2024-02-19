using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TechnicalExcercise.Server.Controllers;
using Xunit;

namespace TechnicalExcercise.Server.Tests.Controllers
{
    public class CarePlanControllerTests
    {
        private readonly List<CarePlan> _carePlans;
        private readonly CarePlanController _controller;

        public CarePlanControllerTests()
        {
            _carePlans = CarePlanController.CarePlans;
            _controller = new CarePlanController();
        }

        [Fact]
        public async Task GetCarePlans_ReturnsOkResult()
        {
            // Act
            var result = await _controller.GetCarePlans();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var carePlans = Assert.IsAssignableFrom<IEnumerable<CarePlan>>(okResult.Value);
            Assert.Empty(carePlans); // Assuming carePlans is initially empty
        }

        [Fact]
        public async Task GetCarePlanById_WithValidId_ReturnsOkResult()
        {
            // Arrange
            var id = Guid.NewGuid();
            var carePlan = new CarePlan { Id = id };
            _carePlans.Add(carePlan);

            // Act
            var result = await _controller.GetCarePlanById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedCarePlan = Assert.IsType<CarePlan>(okResult.Value);
            Assert.Equal(id, returnedCarePlan.Id);
        }

        [Fact]
        public async Task GetCarePlanById_WithInvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            var id = Guid.NewGuid();

            // Act
            var result = await _controller.GetCarePlanById(id);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }
    }
}
