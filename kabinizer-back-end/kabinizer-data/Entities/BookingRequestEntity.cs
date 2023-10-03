using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("BookingRequest")]
public class BookingRequestEntity
{
    public Guid Id { get; set; }
    
}