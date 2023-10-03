using kabinizer_api.Dtos.BookingRequest;
using kabinizer_api.Model;
using kabinizer_api.Services;
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
    private readonly ITokenService _tokenService;

    public BookingRequestController(EntityContext entityContext, ITokenService tokenService)
    {
        _entityContext = entityContext;
        _tokenService = tokenService;
    }

    [HttpGet]
    public IEnumerable<BookingRequest> GetBookingRequests()
    {
        var currentUserId = _tokenService.GetUserId();
        return _entityContext.BookingRequests.Where(b => b.UserId == currentUserId).Select(BookingRequest.FromModel);
    }

    [HttpGet]
    [Route("user/{userId}")]
    public IEnumerable<BookingRequest> GetBookingRequestsByUserId(Guid userId)
    {
        return _entityContext.BookingRequests
            .Where(e => e.UserId == userId)
            .ToList()
            .Select(BookingRequest.FromModel);
    }


    [HttpPost]
    public void AddBookingRequests([Required] IEnumerable<CreateBookingRequestDto> r)
    {
        var currentUserId = _tokenService.GetUserId();
        IEnumerable<BookingRequestEntity> bookingRequestEntities =
            r.Select(e => new BookingRequestEntity(currentUserId, e.FromDate, e.ToDate));

        _entityContext.BookingRequests.AddRange(bookingRequestEntities);
        _entityContext.SaveChanges();
    }

    [HttpDelete]
    public bool DeleteBookingRequest([Required] Guid bookingRequestId)
    {
        var currentUserId = _tokenService.GetUserId();

        BookingRequestEntity entityToRemove = _entityContext.BookingRequests.Single(br => br.Id == bookingRequestId);

        if (entityToRemove.UserId != currentUserId)
        {
            throw new Exception("You cannot remove a booking request for another user");
        }

        _entityContext.BookingRequests.Remove(entityToRemove);
        _entityContext.SaveChanges();
        return true;
    }
}