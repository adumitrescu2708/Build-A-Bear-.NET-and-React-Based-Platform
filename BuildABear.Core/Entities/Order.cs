
using BuildABear.Core.Enums;

namespace BuildABear.Core.Entities;

public class Order : BaseEntity
{
    public int Price { get; set; } = default!;
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public string Address { get; set; } = default!;
    public OrderStatus Status { get; set; } = default!;

    public ICollection<Teddy>? Products { get; set; } = default!;

    /* one-to-many relationship user - order */
    public Guid UserId { get; set; } = default!;
    public User User { get; set; } = default!;

}
