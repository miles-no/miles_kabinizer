using kabinizer_data.Entities;

namespace kabinizer_api.Model;

public record BookingRequest(Guid BookingRequestId, Period Period, User User)
{
    public static BookingRequest FromModel(BookingRequestEntity e)
    {
        return new BookingRequest(e.Id, Period.FromObject(e.Period), User.FromEntity(e.User));
    }
};