using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record BookingRequest(Guid Id, Guid UserId, DateOnly FromDate, DateOnly ToDate)
{
    public static BookingRequest FromModel(BookingRequestEntity e)
    {
        return new BookingRequest(e.Id, e.UserId, DateOnly.FromDateTime(e.FromDate), DateOnly.FromDateTime(e.ToDate));
    }
};