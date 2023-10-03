using kabinizer_api.Model;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingRequestController : ControllerBase
{
    [HttpGet]
    public IEnumerable<BookingRequest> GetBookingRequests()
    {
        return new List<BookingRequest>
        {
            new(Guid.NewGuid())
        };
    }

    [HttpPost]
    public BookingRequest AddBookingRequest([Required] BookingRequest bookingRequest)
    {
        return new BookingRequest(Guid.NewGuid());
    }

    [HttpDelete]
    public bool DeleteBookingRequest([Required] Guid bookingRequestId)
    {
        return true;
    }
}