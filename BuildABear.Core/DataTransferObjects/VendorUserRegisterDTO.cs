
namespace BuildABear.Core.DataTransferObjects;

public class VendorUserRegisterDTO : UserAddDTO
{
    public string VendorEmail { get; set; } = default!;
}
