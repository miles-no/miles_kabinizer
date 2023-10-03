using kabinizer_api.Dtos.BookingRequest;
using kabinizer_api.Model;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingRequestController : ControllerBase
{
    private readonly EntityContext _entityContext;

    public BookingRequestController(EntityContext entityContext)
    {
        _entityContext = entityContext;
    }

    [HttpGet]
    public IEnumerable<BookingRequest> GetBookingRequests()
    {
        return _entityContext.BookingRequests.Select(BookingRequest.FromEntity);
    }

    [HttpPost]
    public void AddBookingRequests([Required] IEnumerable<CreateBookingRequestDto> r)
    {
        // TODO: Use authenticated user
        IEnumerable<BookingRequestEntity> bookingRequestEntities =
            r.Select(e => new BookingRequestEntity(e.UserId, e.FromDate, e.ToDate));

        _entityContext.BookingRequests.AddRange(bookingRequestEntities);
        _entityContext.SaveChanges();
    }

    [HttpDelete]
    public bool DeleteBookingRequest([Required] Guid bookingRequestId)
    {
        BookingRequestEntity entityToRemove = _entityContext.BookingRequests.Single(br => br.Id == bookingRequestId);
        _entityContext.BookingRequests.Remove(entityToRemove);
        _entityContext.SaveChanges();
        return true;
    }
}