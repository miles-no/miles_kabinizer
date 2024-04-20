using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("BookingRequest")]
public class BookingRequestEntity(
    Guid id,
    Guid userId,
    Guid periodId,
    DateTime createdDate,
    Guid createdBy,
    DateTime? updatedDate,
    Guid? updatedBy,
    UserEntity user,
    PeriodEntity period
)
{
    public BookingRequestEntity() : this(Guid.NewGuid(), Guid.Empty, Guid.Empty, DateTime.Now, Guid.Empty, null, null,
        new UserEntity(), new PeriodEntity { Title = null, DrawId = default }
    )
    {
    }


    public Guid Id { get; set; } = id;
    public Guid UserId { get; set; } = userId;
    public UserEntity User { get; set; } = user;
    public PeriodEntity Period { get; set; } = period;
    public Guid PeriodId { get; set; } = periodId;
    public DateTime CreatedDate { get; set; } = createdDate;
    public Guid CreatedBy { get; set; } = createdBy;
    public DateTime? UpdatedDate { get; set; } = updatedDate;
    public Guid? UpdatedBy { get; set; } = updatedBy;
}