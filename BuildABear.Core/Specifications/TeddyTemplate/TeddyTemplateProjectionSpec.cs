using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects.TeddyTemplate;
using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BuildABear.Core.Specifications;

public class TeddyTemplateProjectionSpec : BaseSpec<TeddyTemplateProjectionSpec, TeddyTemplate, TeddyTemplateViewDTO>
{
    protected override Expression<Func<TeddyTemplate, TeddyTemplateViewDTO>> Spec => e => new()
    {
        id = e.Id,
        TeddyName = e.TeddyName,
    };

    public TeddyTemplateProjectionSpec(string? search) {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.TeddyName, searchExpr));
    }
}
