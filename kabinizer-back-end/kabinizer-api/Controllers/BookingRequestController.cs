using kabinizer_api.Dtos.BookingRequest;
using kabinizer_api.Model;
using kabinizer_api.Services.BookingRequest;
using kabinizer_api.Services.Export;
using kabinizer_data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingRequestController(
    EntityContext entityContext,
    BookingRequestService bookingRequestService
) : ControllerBase
{
    [HttpGet("{id:guid}")]
    [ProducesResponseType(200, Type = typeof(BookingRequestDto))]
    [ProducesResponseType(404, Type = typeof(string))]
    public async Task<ActionResult<BookingRequestDto>> GetBookingRequest(Guid id)
    {
        try
        {
            var bookingRequest = await bookingRequestService.GetBookingRequest(id);
            if (bookingRequest == null)
            {
                return NotFound("Booking request does not exist or does not belong to the current user");
            }

            return Ok(BookingRequestDto.FromModel(bookingRequest));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<BookingRequestDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public async Task<ActionResult<IEnumerable<BookingRequestDto>>> GetBookingRequests()
    {
        try
        {
            var bookingRequests = await bookingRequestService.GetBookingRequests();
            return Ok(bookingRequests.Select(BookingRequestDto.FromModel));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpGet("user/{userId:guid}")]
    [ProducesResponseType(200, Type = typeof(IEnumerable<BookingRequestDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public async Task<ActionResult<IEnumerable<BookingRequestDto>>> GetBookingRequestsByUser(Guid userId)
    {
        try
        {
           var bookingRequests = await bookingRequestService.GetBookingRequestsByUser(userId);
           if (bookingRequests.Count == 0)
           {
               return NotFound("No booking requests found for the user");
           }
           
           return Ok(bookingRequests.Select(BookingRequestDto.FromModel));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpGet("period/{periodId:guid}")]
    [ProducesResponseType(200, Type = typeof(IEnumerable<BookingRequestDto>))]
    [ProducesResponseType(404, Type = typeof(string))]
    public async Task<ActionResult<IEnumerable<BookingRequestDto>>> GetBookingRequestsByPeriod(Guid periodId)
    {
        try
        {
            var bookingRequests = await bookingRequestService.GetBookingRequestsByPeriod(periodId);
            if (bookingRequests.Count == 0)
            {
                return NotFound("No booking requests found for the period");
            }
            
            return Ok(bookingRequests.Select(BookingRequestDto.FromModel));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    [ProducesResponseType(200, Type = typeof(BookingRequestDto))]
    [ProducesResponseType(400, Type = typeof(string))]
    public async Task<ActionResult<IEnumerable<BookingRequestDto>>> AddBookingRequests([Required] IEnumerable<CreateBookingRequestDto> requests)
    {
        try
        {
            var bookingRequest = await bookingRequestService.AddBookingRequest(requests.First());
            if (bookingRequest == null)
            {
                return BadRequest("Booking request could not be added");
            }

            return Ok(BookingRequestDto.FromModel(bookingRequest));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [ProducesResponseType(200, Type = typeof(string))]
    [ProducesResponseType(400, Type = typeof(string))]
    public async Task<IActionResult> DeleteBookingRequests([Required] IEnumerable<Guid> requests)
    {
        try
        {
            foreach (Guid request in requests)
            {
                await bookingRequestService.DeleteBookingRequest(request);
            }

            return Ok("Booking requests deleted");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("export")]
    public IActionResult Export()
    {
        // TODO: Take some input and only export the values we want, for example for a single period
        IEnumerable<BookingRequest> bookingRequests = entityContext.BookingRequests
            .Include(br => br.User)
            .Include(br => br.Period)
            .AsEnumerable().Select(BookingRequest.FromModel);
        byte[] fileContent = CsvService.ExportToCsv(bookingRequests);
        return File(fileContent, "application/octet-stream", "export.csv");
    }
}