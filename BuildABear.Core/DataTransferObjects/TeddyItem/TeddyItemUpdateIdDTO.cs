
namespace BuildABear.Core.DataTransferObjects;

public class TeddyItemUpdateIdDTO
{
    public Guid Id { get; set; } = default!;
    public int? Price { get; set; } = default!;
    public string? Description { get; set; }
    public string? Fabric { get; set; } = default!;
    public string? Color { get; set; } = default!;
    public int? Quantity { get; set; } = default!;
}
