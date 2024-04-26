
using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class OrderViewDTO
{
    public Guid Id { get; set; } = default!;
    public ICollection<TeddyBuildDTO> teddies { get; set; } = default!;
    public int Price { get; set; } = default!;
    public OrderStatus Status { get; set; } = default!;
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public string Address { get; set; } = default!;
}
