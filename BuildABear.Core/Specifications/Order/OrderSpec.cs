

using Ardalis.Specification;
using BuildABear.Core.Entities;

namespace BuildABear.Core.Specifications;

public class OrderSpec : BaseSpec<OrderSpec, Order>
{
    public OrderSpec(Guid userId, bool is_userId)
    {
        if (is_userId)
        {
            Query.Where(e => e.UserId == userId);
        }
        else {
            Query.Where(e => e.CartId == userId);
        }
        
    }

    public OrderSpec(string SKU)
    {

        //Query.Where(e => e.SKU == SKU);

    }
}

