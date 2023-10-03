namespace kabinizer_api.Dtos.BookingRequest;

public record CreateBookingRequestDto(DateOnly FromDate, DateOnly ToDate);