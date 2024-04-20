using BuildABear.Core.Enums;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace BuildABear.Backend.Controllers;

public class TeddyItemAddDTO
{
    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string? Description { get; set; }
    public string Fabric { get; set; } = default!;
    public string Color { get; set; } = default!;
    public int Quantity { get; set; } = default!;
    public TeddyItemCategoryEnum Category { get; set; } = default!;
    public IFormFile File { get; set; } = default!;
    public string FileName { get; set; } = default!;
    public string compute_sku(Guid VendorId) {
        return Name.Substring(0, 3) + "-" + VendorId.ToString() + "-" + Category.ToString().Substring(0, 3);
    }
}
  