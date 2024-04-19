using kabinizer_data.Entities;

namespace kabinizer_api.Dtos.BookingRequest;

public class BookingRequestDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid PeriodId { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public Guid? UpdatedBy { get; set; }

    public static BookingRequestDto FromModel(BookingRequestEntity e)
    {
        return new BookingRequestDto
        {
            Id = e.Id,
            UserId = e.UserId,
            PeriodId = e.PeriodId,
            CreatedDate = e.CreatedDate,
            CreatedBy = e.CreatedBy,
            UpdatedDate = e.UpdatedDate,
            UpdatedBy = e.UpdatedBy
        };
    }
}