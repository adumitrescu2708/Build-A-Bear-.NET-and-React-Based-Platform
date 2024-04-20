

using Ardalis.Specification;
using BuildABear.Core.Entities;

namespace BuildABear.Core.Specifications;

public class TeddySpec2 : BaseSpec<TeddySpec2, Teddy>
{
    public TeddySpec2(Guid cartId, bool isCartId)
    {
        if (isCartId)
            Query.Where(e => e.CartId == cartId);
        else
            Query.Where(e => e.Id == cartId);
    }
}
