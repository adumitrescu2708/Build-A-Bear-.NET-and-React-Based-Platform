using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace BuildABear.Core.Specifications;

public sealed class AdminVendorProjection : BaseSpec<AdminVendorProjection, Vendor, VendorAddDTO>
{
    protected override Expression<Func<Vendor, VendorAddDTO>> Spec => e => new()
    {
           Email = e.Email,
           ContractEndDate = e.ContractEndDate,
           ContractStartDate = e.ContractStartDate,
           ContractRenewalTerms = e.ContractRenewalTerms,
           Address = e.Address,
           Name = e.Name,
           PaymentMethod = e.PaymentMethod,
           PhoneNumber = e.PhoneNumber,
    };
    public AdminVendorProjection(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
