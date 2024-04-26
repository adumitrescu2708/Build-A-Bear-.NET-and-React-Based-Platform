

using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Linq.Expressions;
using Ardalis.Specification;

namespace BuildABear.Core.Specifications;

public class TeddyViewSpec : BaseSpec<TeddyViewSpec, Teddy, TeddyViewDTO>
{
    private readonly Guid cartId;
    protected override Expression<Func<Teddy, TeddyViewDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Filling = e.Filling,
        TeddyTemplateId = e.TeddyTemplateId,
        ItemsIds = e.Items != null ? e.Items.Select(x => x.Id).ToList() : null
    };

    public TeddyViewSpec(ICollection<Teddy> products)
    {
        foreach (var teddy in products)
        {
            Query.Where(e => e.Id == teddy.Id);
        }
    }

    public TeddyViewSpec(Guid cartId, int isCartId)
    {
        if (isCartId == 1)
            Query.Where(e => e.CartId == cartId);
        else if (isCartId == 2)
            Query.Where(e => e.Id == cartId);
        else
            Query.Where(e => e.OrderId == cartId);
    }
}
