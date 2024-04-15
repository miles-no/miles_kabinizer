using kabinizer_api.Dtos.Deadline;
using kabinizer_api.Services.Period;
using kabinizer_data.Entities;

namespace kabinizer_api_test;

public abstract class PeriodServiceTest
{
    public class CreatePeriods {
        [Fact]
        public void CreatePeriods_StartsOnFirstProvidedDay() {
            // Arrange
            List<DeadlinePeriod> deadlinePeriods =
            [
                new DeadlinePeriod { Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            ];
            PeriodService periodService = new();

            // Act
            List<PeriodEntity> periods = periodService.CreatePeriods(Guid.NewGuid(), false, deadlinePeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 02, 01), DateOnly.FromDateTime(periods[0].PeriodStart));
        }

        [Fact]
        public void CreatePeriods_EndsOnLastProvidedDay() {
            // Arrange
            List<DeadlinePeriod> deadlinePeriods =
            [
                new DeadlinePeriod
                {
                    Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59")
                }
            ];
            PeriodService periodService = new();

            // Act
            List<PeriodEntity> periods = periodService.CreatePeriods(Guid.NewGuid(), false, deadlinePeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 03, 31), DateOnly.FromDateTime(periods[^1].PeriodEnd));
        }

        [Fact]
        public void CreatePeriods_StartsOnFirstProvidedDay_ForMultipleDeadlinePeriods() {
            // Arrange
            List<DeadlinePeriod> deadlinePeriods =
            [
                new DeadlinePeriod
                {
                    Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-02-28T23:59:59")
                },

                new DeadlinePeriod
                {
                    Start = DateTime.Parse("2023-03-15T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59")
                }
            ];
            PeriodService periodService = new();

            // Act
            List<PeriodEntity> periods = periodService.CreatePeriods(Guid.NewGuid(), false, deadlinePeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 02, 01), DateOnly.FromDateTime(periods[0].PeriodStart));
        }

        [Fact]
        public void CreatePeriods_EndsOnLastProvidedDay_ForMultipleDeadlinePeriods() {
            // Arrange
            List<DeadlinePeriod> deadlinePeriods =
            [
                new DeadlinePeriod { Start = DateTime.Parse("2023-02-01T00:00:00"), End = DateTime.Parse("2023-02-28T23:59:59") },

                new DeadlinePeriod { Start = DateTime.Parse("2023-03-15T00:00:00"), End = DateTime.Parse("2023-03-31T23:59:59") }
            ];
            PeriodService periodService = new PeriodService();

            // Act
            List<PeriodEntity> periods = periodService.CreatePeriods(Guid.NewGuid(), false, deadlinePeriods);

            // Assert
            Assert.Equal(new DateOnly(2023, 03, 31), DateOnly.FromDateTime(periods[^1].PeriodEnd));
        }

        [Fact]
        public void CreatePeriods_Easter2024() {
            // Arrange
            List<DeadlinePeriod> deadlinePeriods =
            [
                new DeadlinePeriod
                {
                    Start = DateTime.Parse("2024-03-22T00:00:00"),
                    End = DateTime.Parse("2024-03-27T23:59:59"),
                    Title = "Påskeferie del 1"
                },

                new DeadlinePeriod
                {
                    Start = DateTime.Parse("2024-03-28T00:00:00"),
                    End = DateTime.Parse("2024-04-01T23:59:59"),
                    Title = "Påskeferie del 2"
                }
            ];
            PeriodService periodService = new();

            // Act
            List<PeriodEntity> periods = periodService.CreatePeriods(Guid.NewGuid(), true, deadlinePeriods);

            // Assert
            Assert.Equal(new DateOnly(2024, 03, 22), DateOnly.FromDateTime(periods[0].PeriodStart));
            Assert.Equal(new DateOnly(2024, 03, 27), DateOnly.FromDateTime(periods[0].PeriodEnd));

            Assert.Equal(new DateOnly(2024, 03, 28), DateOnly.FromDateTime(periods[1].PeriodStart));
            Assert.Equal(new DateOnly(2024, 04, 01), DateOnly.FromDateTime(periods[1].PeriodEnd));
        }
    }
}