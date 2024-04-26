using BuildABear.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace BuildABear.Core.Entities;

public class Vendor : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
    public string Address { get; set; } = default!;
    public DateTime ContractStartDate { get; set; } = default!;
    public DateTime ContractEndDate { get; set; } = default!;
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public VendorContractRenewalTerms ContractRenewalTerms { get; set; } = default!;

    /* one-to-many relationship between a vendor and enterprise users */
    public ICollection<User> Vendors { get; set; } = default!;

    /* one-to-many relationship between a vendor and teddy items */
    public ICollection<TeddyItem> TeddyItems { get; set; } = default!;
}
