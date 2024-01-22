using System.ComponentModel.DataAnnotations.Schema;

namespace kabinizer_data.Entities;

[Table("User")]
public class UserEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}