using kabinizer_api.Dtos.Deadline;
using kabinizer_api.Services.Period;
using kabinizer_data;
using kabinizer_data.Entities;

namespace kabinizer_api.Services.Deadline;

public class DeadlineService(EntityContext entityContext, PeriodService periodService)
{
    public void CreateDeadline(CreateDeadlineDto deadline)
    {
        Guid id = Guid.NewGuid();
        DeadlineEntity deadlineEntity = new()
        {
            Id = id,
            DeadlineStart = deadline.DeadlineStart,
            DeadlineEnd = deadline.DeadlineEnd,
            Title = deadline.Title,
            Periods = periodService.CreatePeriods(id, deadline.IsSpecial, deadline.DeadlinePeriods),
            IsSpecial = deadline.IsSpecial
        };
        entityContext.Deadlines.Add(deadlineEntity);
        entityContext.SaveChanges();
    }
}
