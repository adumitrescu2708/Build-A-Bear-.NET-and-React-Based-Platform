using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class BriefTeddyItemDTO
{
    public Guid Id { get; set; } = default!;
    public string SKU { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string? Description { get; set; }
    public string Filename { get; set; } = default!;
    public TeddyItemCategoryEnum Category { get; set; } = default!;
    public TeddyItemValability Valability { get; set; } = default!;
}
