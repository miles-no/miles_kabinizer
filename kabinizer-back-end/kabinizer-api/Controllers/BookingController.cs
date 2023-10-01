using System.ComponentModel.DataAnnotations;
using kabinizer_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Booking> GetBookings()
    {
        return new List<Booking>
        {
            new(Guid.NewGuid())
        };
    }

    [HttpPost]
    public Booking AddBooking([Required] Booking booking)
    {
        return new Booking(Guid.NewGuid());
    }

    // Probably won't need this
    //[HttpPatch]
    //public Booking UpdateBooking([Required] Booking booking)
    //{
    //    return new Booking(Guid.NewGuid());
    //}

    [HttpDelete]
    public bool DeleteBooking([Required] Guid bookingId)
    {
        return true;
    }
}