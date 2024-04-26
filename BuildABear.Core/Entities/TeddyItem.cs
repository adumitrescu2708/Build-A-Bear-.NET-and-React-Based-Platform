using BuildABear.Core.Enums;
using System.Text.Json.Serialization;

namespace BuildABear.Core.Entities;

public class TeddyItem : BaseEntity
{
    public string SKU { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string? Description { get; set; }
    public string Fabric { get; set; } = default!;
    public string Color { get; set; } = default!;
    public int Quantity { get; set; } = default!;
    public string FileName { get; set; } = default!;    
    public TeddyItemValability Valability { get; set; } = default!;
    public TeddyItemCategoryEnum ItemCategory { get; set; } = default!;
    public string Path { get; set; } = default!;

    /* one-to-many relationship between a vendor and teddy items */
    public Guid VendorId { get; set; }
    public Vendor Vendor { get; set; } = default!;

    /* many-to-many relationship between teddys and teddy items*/
    public ICollection<Teddy> Teddys { get; set; } = default!;
}
