using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class VendorContractDTO
{
    public DateTime? ContractStartDate { get; set; } = default!;
    public DateTime? ContractEndDate { get; set; }
    public PaymentMethod? PaymentMethod { get; set; } = default;
    public VendorContractRenewalTerms? ContractRenewalTerms { get; set; } = default!;
}
