using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class BriefTeddyItemDTO
{
    public string SKU { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string? Description { get; set; }
    public TeddyItemCategoryEnum Category { get; set; } = default!;
    public TeddyItemValability Valability { get; set; } = default!;
}
