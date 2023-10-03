using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("BookingRequest")]
public class BookingRequestEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public Guid? UpdatedBy { get; set; }

    public BookingRequestEntity(Guid id, Guid userId, DateTime fromDate, DateTime toDate, DateTime createdDate,
        Guid createdBy, DateTime? updatedDate, Guid? updatedBy)
    {
        Id = id;
        UserId = userId;
        FromDate = fromDate;
        ToDate = toDate;
        CreatedDate = createdDate;
        CreatedBy = createdBy;
        UpdatedDate = updatedDate;
        UpdatedBy = updatedBy;
    }

    public BookingRequestEntity(Guid userId, DateOnly fromDate, DateOnly toDate)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        FromDate = fromDate.ToDateTime(TimeOnly.MinValue);
        ToDate = toDate.ToDateTime(TimeOnly.MinValue);
        CreatedDate = DateTime.Now;
        CreatedBy = userId; // Is this even needed? Won't it always be the same as the user id?
    }
}