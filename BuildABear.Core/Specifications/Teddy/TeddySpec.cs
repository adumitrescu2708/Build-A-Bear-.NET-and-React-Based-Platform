
using BuildABear.Core.Entities;
using BuildABear.Core.DataTransferObjects;
using System.Linq.Expressions;
using Ardalis.Specification;

namespace BuildABear.Core.Specifications;

public sealed class TeddySpec : BaseSpec<TeddySpec, Teddy, TeddyBuildDTO>
{
    private readonly Guid cartId;
    protected override Expression<Func<Teddy, TeddyBuildDTO>> Spec => e => new()
    {
        Name = e.Name,
        Filling = e.Filling,
        TeddyTemplateId = e.TeddyTemplateId,
        ItemsIds = e.Items != null ? e.Items.Select(x => x.Id).ToList() : null
    };

    public TeddySpec(ICollection<Teddy> products) { 
        foreach(var teddy in products) {
            Query.Where(e => e.Id == teddy.Id);
        }
    }

    public TeddySpec(Guid cartId, bool isCartId) {
        if(isCartId)
            Query.Where(e => e.CartId == cartId);
        else
            Query.Where(e => e.Id == cartId);
    }
}
