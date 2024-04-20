

using Ardalis.Specification;
using BuildABear.Core.Entities;

namespace BuildABear.Core.Specifications;

public class OrderSpec : BaseSpec<OrderSpec, Order>
{
    public OrderSpec(Guid userId)
    {
        Query.Where(e => e.UserId == userId);
    }
}

