using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BuildABear.Core.Specifications;

public sealed class VendorProjection : BaseSpec<VendorProjection, Vendor, VendorBriefView>
{
    protected override Expression<Func<Vendor, VendorBriefView>> Spec => e => new()
    {
        Email = e.Email,
        Address = e.Address,
        Name = e.Name
    };

    public VendorProjection(Guid id) : base(id)
    {
        
    }
    public VendorProjection(string? search)
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
