using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using System.Linq.Expressions;
namespace BuildABear.Core.Specifications;

public sealed class VendorContractSpec : BaseSpec<VendorContractSpec, Vendor, VendorContractDTO>
{
    protected override Expression<Func<Vendor, VendorContractDTO>> Spec => e => new()
    {
        ContractEndDate = e.ContractEndDate,
        ContractRenewalTerms = e.ContractRenewalTerms,
        ContractStartDate = e.ContractStartDate,
        PaymentMethod = e.PaymentMethod,
    };

    public VendorContractSpec(Guid id) : base(id) { }
    public VendorContractSpec(string Email)
    {
        Query.Where(e => e.Email == Email);
    }

}
