

using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class TeddyItemUpdateDTO
{
    public string SKU { get; set; } = default!;
    public int? Price { get; set; } = default!;
    public string? Description { get; set; }
    public string? Fabric { get; set; } = default!;
    public string? Color { get; set; } = default!;
    public int? Quantity { get; set; } = default!;
}
