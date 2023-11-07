using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("BookingRequest")]
public class BookingRequestEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public PeriodEntity Period { get; set; }
    public Guid PeriodId { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public Guid? UpdatedBy { get; set; }

    public BookingRequestEntity(Guid id, Guid userId, Guid periodId, DateTime createdDate,
        Guid createdBy, DateTime? updatedDate, Guid? updatedBy)
    {
        Id = id;
        UserId = userId;
        PeriodId = periodId;
        CreatedDate = createdDate;
        CreatedBy = createdBy;
        UpdatedDate = updatedDate;
        UpdatedBy = updatedBy;
    }

    public BookingRequestEntity(Guid userId, Guid periodId)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        PeriodId = periodId;
        CreatedDate = DateTime.Now;
        CreatedBy = userId; // Is this even needed? Won't it always be the same as the user id?
    }
}