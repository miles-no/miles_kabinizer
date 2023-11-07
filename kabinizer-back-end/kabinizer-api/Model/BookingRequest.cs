using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record BookingRequest(Guid Id, Guid UserId, Guid PeriodId)
{
    public static BookingRequest FromEntity(BookingRequestEntity e)
    {
        return new BookingRequest(e.Id, e.UserId, e.PeriodId);
    }
};