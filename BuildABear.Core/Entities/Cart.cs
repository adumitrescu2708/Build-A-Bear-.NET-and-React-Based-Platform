
namespace BuildABear.Core.Entities;

public class Cart : BaseEntity
{
    /* one-to-one relationship between an user and a cart */
    public Guid UserId { get; set; } = default!;
    public User User { get; set; } = default!;

    /* one-to-many relationship between a cart and products */
    public ICollection<Teddy>? Products { get; set; } = default!;

    public Order? Order { get; set; } = default!;

}
