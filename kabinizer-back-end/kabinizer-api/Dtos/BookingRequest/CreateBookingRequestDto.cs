namespace kabinizer_api.Dtos.BookingRequest;

public record CreateBookingRequestDto(Guid UserId, DateOnly FromDate, DateOnly ToDate);