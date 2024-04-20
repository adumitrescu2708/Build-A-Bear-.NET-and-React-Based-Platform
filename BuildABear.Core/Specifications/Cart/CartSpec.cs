using Ardalis.Specification;
using BuildABear.Core.Entities;

namespace BuildABear.Core.Specifications;

public class CartSpec : BaseSpec<CartSpec, Cart>
{
    public CartSpec(Guid UserId) {
        Query.Where(e => e.UserId == UserId);
    }
}
