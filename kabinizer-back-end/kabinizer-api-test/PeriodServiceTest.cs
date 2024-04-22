using kabinizer_api.Dtos.Draw;
using kabinizer_api.Services.Period;
using kabinizer_data;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_api_test;

public class PeriodServiceTest
{
    private static readonly EntityContext EntityContext =
        new EntityContext(new DbContextOptionsBuilder<EntityContext>().UseInMemoryDatabase("test").Options);

    public class CreatePeriods
    {
        [Fact]
        public void CreatePeriods_StartsOnFirstProvidedDay()
        {
            // Arrange
            var drawPeriods = new List<DrawPeriod>
            {
                new() { Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            };
            var periodService = new PeriodService(EntityContext);

            // Act
            var periods = periodService.CreatePeriods(Guid.NewGuid(), false, drawPeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 02, 01), DateOnly.FromDateTime(periods[0].PeriodStart));
        }

        [Fact]
        public void CreatePeriods_EndsOnLastProvidedDay()
        {
            // Arrange
            var drawPeriods = new List<DrawPeriod>
            {
                new() { Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            };
            var periodService = new PeriodService(EntityContext);

            // Act
            var periods = periodService.CreatePeriods(Guid.NewGuid(), false, drawPeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 03, 31), DateOnly.FromDateTime(periods[^1].PeriodEnd));
        }

        [Fact]
        public void CreatePeriods_StartsOnFirstProvidedDay_ForMultipleDrawPeriods()
        {
            // Arrange
            var drawPeriods = new List<DrawPeriod>
            {
                new()
                {
                    Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-02-28T23:59:59")
                },
                new() { Start = DateTime.Parse("2023-03-15T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            };
            var periodService = new PeriodService(EntityContext);

            // Act
            var periods = periodService.CreatePeriods(Guid.NewGuid(), false, drawPeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 02, 01), DateOnly.FromDateTime(periods[0].PeriodStart));
        }

        [Fact]
        public void CreatePeriods_EndsOnLastProvidedDay_ForMultipleDrawPeriods()
        {
            // Arrange
            var drawPeriods = new List<DrawPeriod>
            {
                new()
                {
                    Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-02-28T23:59:59")
                },
                new() { Start = DateTime.Parse("2023-03-15T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            };
            var periodService = new PeriodService(EntityContext);

            // Act
            var periods = periodService.CreatePeriods(Guid.NewGuid(), false, drawPeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 03, 31), DateOnly.FromDateTime(periods[^1].PeriodEnd));
        }

        [Fact]
        public void CreatePeriods_Easter2024()
        {
            // Arrange
            var drawPeriods = new List<DrawPeriod>
            {
                new()
                {
                    Start = DateTime.Parse("2024-03-22T00:00:00"),
                    End = DateTime.Parse("2024-03-27T23:59:59"),
                    Title = "Påskeferie del 1"
                },
                new()
                {
                    Start = DateTime.Parse("2024-03-28T00:00:00"),
                    End = DateTime.Parse("2024-04-01T23:59:59"),
                    Title = "Påskeferie del 2"
                }
            };
            var periodService = new PeriodService(EntityContext);

            // Act
            var periods = periodService.CreatePeriods(Guid.NewGuid(), true, drawPeriods);

            // Assert
            Assert.Equal(new DateOnly(2024, 03, 22), DateOnly.FromDateTime(periods[0].PeriodStart));
            Assert.Equal(new DateOnly(2024, 03, 27), DateOnly.FromDateTime(periods[0].PeriodEnd));

            Assert.Equal(new DateOnly(2024, 03, 28), DateOnly.FromDateTime(periods[1].PeriodStart));
            Assert.Equal(new DateOnly(2024, 04, 01), DateOnly.FromDateTime(periods[1].PeriodEnd));
        }
    }
}