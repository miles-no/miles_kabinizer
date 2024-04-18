using kabinizer_api.Dtos.BookingRequest;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.EntityFrameworkCore;

namespace kabinizer_api.Services.BookingRequest;

public abstract class BookingRequestService(EntityContext entityContext, ITokenService tokenService)
{
    private async Task<BookingRequestEntity?> GetBookingRequestById(Guid bookingRequestId)
    {
        return await entityContext.BookingRequests
                   .Include(br => br.User)
                   .Include(br => br.Period)
                   .FirstOrDefaultAsync(b => b.Id == bookingRequestId && b.UserId == tokenService.GetUserId())
               ?? throw new InvalidOperationException("No matching booking request found.");
    }

    public async Task<BookingRequestEntity?> GetBookingRequest(Guid bookingRequestId)
    {
        BookingRequestEntity? id = await GetBookingRequestById(bookingRequestId);
        if (id == null)
        {
            throw new Exception("Booking request does not exist or does not belong to the current user");
        }

        return id;
    }

    public async Task<IEnumerable<BookingRequestEntity>> GetBookingRequests()
    {
        var  bookingRequestEntities = await entityContext.BookingRequests
            .Include(br => br.User)
            .Include(br => br.Period)
            .Where(b => b.UserId == tokenService.GetUserId())
            .ToListAsync();
        if (bookingRequestEntities == null)
        {
            throw new Exception("No booking requests found for the current user");
        }

        return bookingRequestEntities;
    }

    public async Task<BookingRequestEntity?> AddBookingRequest(CreateBookingRequestDto request)
    {
        var period = await entityContext.Periods
            .Include(p => p.Draw)
            .FirstOrDefaultAsync(p => p.Draw != null && p.Id == request.PeriodId && p.Draw.DeadlineEnd >= DateTime.Now);

        if (period == null)
        {
            throw new Exception("Period does not exist, is not part of a draw, or the draw has ended");
        }

        var user = await entityContext.Users.FirstOrDefaultAsync(u => u.Id == tokenService.GetUserId());
        if (user == null)
        {
            throw new Exception("User does not exist");
        }

        var bookingRequest = new BookingRequestEntity(tokenService.GetUserId(), request.PeriodId, user, period);
        entityContext.BookingRequests.Add(bookingRequest);
        await entityContext.SaveChangesAsync();
        return bookingRequest;
    }

    public async Task<bool> DeleteBookingRequest(Guid bookingRequestId)
    {
        var bookingRequest = await GetBookingRequestById(bookingRequestId);
        if (bookingRequest == null)
        {
            throw new Exception(
                $"Booking request with id {bookingRequestId} does not exist or does not belong to the current user");
        }

        entityContext.BookingRequests.Remove(bookingRequest);
        await entityContext.SaveChangesAsync();
        return true;
    }
}