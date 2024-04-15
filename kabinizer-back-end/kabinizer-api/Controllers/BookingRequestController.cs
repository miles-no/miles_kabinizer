using kabinizer_api.Dtos.BookingRequest;
using kabinizer_api.Model;
using kabinizer_api.Services;
using kabinizer_api.Services.Export;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingRequestController(EntityContext entityContext, ITokenService tokenService) : ControllerBase
{
    [HttpGet]
    public IEnumerable<BookingRequest> GetBookingRequests()
    {
        Guid currentUserId = tokenService.GetUserId();
        return entityContext.BookingRequests
            .Include(br => br.User)
            .Include(br => br.Period)
            .Where(b => b.UserId == currentUserId)
            .AsEnumerable().Select(BookingRequest.FromModel);
    }

    [HttpPost]
    public void AddBookingRequests([Required] IEnumerable<CreateBookingRequestDto> requests)
    {
        Guid currentUserId = tokenService.GetUserId();
        IEnumerable<BookingRequestEntity> bookingRequestEntities =
            requests.Select(e => new BookingRequestEntity(currentUserId, e.PeriodId));

        entityContext.BookingRequests.AddRange(bookingRequestEntities);
        entityContext.SaveChanges();
    }

    [HttpDelete]
    public bool DeleteBookingRequests([Required] IEnumerable<Guid> requests)
    {
        Guid currentUserId = tokenService.GetUserId();

        foreach (Guid requestId in requests)
        {
            BookingRequestEntity entityToRemove = entityContext.BookingRequests.Single(br => br.Id == requestId);

            if (entityToRemove.UserId != currentUserId)
            {
                throw new Exception("You cannot remove a booking request for another user");
            }

            entityContext.BookingRequests.Remove(entityToRemove);
        }

        entityContext.SaveChanges();
        return true;
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