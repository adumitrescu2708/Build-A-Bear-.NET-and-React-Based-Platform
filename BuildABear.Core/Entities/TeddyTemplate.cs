
namespace BuildABear.Core.Entities;

public class TeddyTemplate : BaseEntity
{
    public string Path { get; set; } = default!;
    public string Filename { get; set; } = default!;
    public string TeddyName { get; set; } = default!;
    
    /* one-to-many relationship between a teddy template and teddys */
    public ICollection<Teddy> UserTeddys { get; set; } = default!;
}
