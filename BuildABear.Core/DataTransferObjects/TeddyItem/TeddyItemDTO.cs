using BuildABear.Core.Enums;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace BuildABear.Core.DataTransferObjects;

public class TeddyItemDTO
{
    public string SKU { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string? Description { get; set; }
    public string Fabric { get; set; } = default!;
    public string Color { get; set; } = default!;
    public int Quantity { get; set; } = default!;
    public TeddyItemCategoryEnum Category { get; set; } = default!;
    public TeddyItemValability Valability { get; set; } = default!;
    public string VendorName { get; set; } = default!;
}
