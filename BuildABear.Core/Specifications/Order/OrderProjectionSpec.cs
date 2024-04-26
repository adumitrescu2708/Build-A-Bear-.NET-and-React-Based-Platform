using Ardalis.Specification;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.DataTransferObjects.TeddyTemplate;
using BuildABear.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BuildABear.Core.Specifications;

public class OrderProjectionSpec : BaseSpec<OrderProjectionSpec, Order, OrderViewDTO>
{
    protected override Expression<Func<Order, OrderViewDTO>> Spec => e => new()
    {
        Id = e.Id,
        Price = e.Price,
        Status = e.Status,
        Address = e.Address,
        PaymentMethod = e.PaymentMethod,
        //teddies = e.Products != null ? e.Pro : null
    };

    public OrderProjectionSpec(Guid id)
    {
        Query.Where(e => e.UserId == id);
    }

}
