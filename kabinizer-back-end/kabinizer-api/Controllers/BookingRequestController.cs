using kabinizer_api.Dtos.BookingRequest;
using kabinizer_api.Model;
using kabinizer_api.Services.Export;
using kabinizer_data;
using kabinizer_data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace kabinizer_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingRequestController : ControllerBase
{
    private readonly EntityContext entityContext;

    public BookingRequestController(EntityContext entityContext)
    {
        this.entityContext = entityContext;
    }

    [HttpGet]
    public IEnumerable<BookingRequest> GetBookingRequests()
    {
        return entityContext.BookingRequests
            .Select(BookingRequest.FromEntity);
    }

    [HttpGet]
    [Route("user")]
    public IEnumerable<BookingRequest> GetBookingRequestsForUser()
    {
        // TODO: use authed user
        return entityContext.BookingRequests
            .Where(e => e.UserId == new Guid("EADD8F73-8B7A-4188-BFF8-8C80E6CB98FA"))
            .ToList()
            .Select(BookingRequest.FromEntity);
    }


    [HttpPost]
    public void AddBookingRequests([Required] IEnumerable<CreateBookingRequestDto> r)
    {
        // TODO: use authed user
        IEnumerable<BookingRequestEntity> bookingRequestEntities =
            r.Select(e => new BookingRequestEntity(new Guid("EADD8F73-8B7A-4188-BFF8-8C80E6CB98FA"), e.PeriodId));
        //r.Select(e => new BookingRequestEntity(e.UserId, e.PeriodId));

        entityContext.BookingRequests.AddRange(bookingRequestEntities);
        entityContext.SaveChanges();
    }

    [HttpDelete]
    public bool DeleteBookingRequest([Required] Guid bookingRequestId)
    {
        BookingRequestEntity entityToRemove = entityContext.BookingRequests.Single(br => br.Id == bookingRequestId);
        entityContext.BookingRequests.Remove(entityToRemove);
        entityContext.SaveChanges();
        return true;
    }

    [HttpGet]
    [Route("export")]
    public IActionResult Export()
    {
        // TODO: Take some input and only export the values we want, for example for a single period
        byte[] fileContent = CsvService.ExportToCsv(GetBookingRequests());
        return File(fileContent, "application/octet-stream", "export.csv");
    }
}