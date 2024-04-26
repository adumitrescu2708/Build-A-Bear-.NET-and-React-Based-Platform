
using System.ComponentModel.DataAnnotations;

namespace BuildABear.Core.DataTransferObjects;

public class VendorBriefView
{
    public Guid id { get; set; } = default!;
    public string Name { get; set; } = default!;
    [EmailAddress(ErrorMessage = "Invalid mail address format")]
    public string Email { get; set; } = default!;
    public string Address { get; set; } = default!;
}
