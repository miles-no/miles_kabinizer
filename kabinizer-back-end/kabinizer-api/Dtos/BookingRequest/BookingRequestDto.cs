using kabinizer_data.Entities;

namespace kabinizer_api.Dtos.BookingRequest;

public class BookingRequestDto(
    Guid id,
    Guid userId,
    Guid periodId,
    DateTime createdDate,
    Guid createdBy,
    DateTime? updatedDate,
    Guid? updatedBy,
    UserEntity user,
    PeriodEntity period)
{
    public Guid Id { get; set; } = id;
    public Guid UserId { get; set; } = userId;
    public UserEntity User { get; set; } = user;
    public PeriodEntity Period { get; set; } = period;
    public Guid PeriodId { get; set; } = periodId;
    public DateTime CreatedDate { get; set; } = createdDate;
    public Guid CreatedBy { get; set; } = createdBy;
    public DateTime? UpdatedDate { get; set; } = updatedDate;
    public Guid? UpdatedBy { get; set; } = updatedBy;

    public static BookingRequestDto FromModel(BookingRequestEntity? e)
    {
        return new BookingRequestDto(e.Id, e.UserId, e.PeriodId, e.CreatedDate, e.CreatedBy, e.UpdatedDate, e.UpdatedBy,
            e.User, e.Period);
    }
}