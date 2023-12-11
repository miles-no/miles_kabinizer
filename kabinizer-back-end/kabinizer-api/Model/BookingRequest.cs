using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record BookingRequest(Guid BookingRequestId, Guid UserId, Guid PeriodId)
{
    public static BookingRequest FromModel(BookingRequestEntity e)
    {
        return new BookingRequest(e.Id, e.UserId, e.PeriodId);
    }
};