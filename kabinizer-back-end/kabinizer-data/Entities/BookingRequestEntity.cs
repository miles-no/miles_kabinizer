using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("BookingRequest")]
public class BookingRequestEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateOnly FromDate { get; set; }
    public DateOnly ToDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public Guid? UpdatedBy { get; set; }

    public BookingRequestEntity(Guid userId, DateOnly fromDate, DateOnly toDate)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        FromDate = fromDate;
        ToDate = toDate;
        CreatedDate = DateTime.Now;
        CreatedBy = userId; // Is this even needed? Won't it always be the same as the user id?
    }
}