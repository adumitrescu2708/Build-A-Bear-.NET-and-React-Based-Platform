using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using BuildABear.Core.Enums;

namespace BuildABear.Core.Specifications;

public sealed class TeddyItemProjectionSpec : BaseSpec<TeddyItemProjectionSpec, TeddyItem, BriefTeddyItemDTO>
{
    protected override Expression<Func<TeddyItem, BriefTeddyItemDTO>> Spec => e => new()
    {
        Name = e.Name,
        Price = e.Price,
        Description = e.Description,
        Category = e.ItemCategory,
        Valability = e.Valability,
        SKU = e.SKU
    };

    public TeddyItemProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        Query.Where(e => EF.Functions.ILike(e.SKU, search));
    }

    public TeddyItemProjectionSpec(TeddyItemCategoryEnum category)
    {
        Query.Where(e => e.ItemCategory == category);
    }
    public TeddyItemProjectionSpec(Guid id)
    {
        Query.Where(e => e.VendorId == id);
    }
}
