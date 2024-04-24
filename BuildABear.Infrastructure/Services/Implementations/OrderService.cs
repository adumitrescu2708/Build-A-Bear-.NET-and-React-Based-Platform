using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Core.Entities;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Enums;
using BuildABear.Core.Specifications;
using BuildABear.Core.Errors;
using System.Net;
using Org.BouncyCastle.Utilities.Net;
using BuildABear.Core.Helpers;
using Microsoft.IdentityModel.Tokens;

namespace BuildABear.Infrastructure.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public OrderService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse> UpdateOrder(Guid id, OrderStatus status, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if(requestingUser.Role != UserRoleEnum.Operator) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only operators can update order!", ErrorCodes.CannotUpdateOrder));
        }
        var order = await _repository.GetAsync<Order>(id, cancellationToken);
        if(order == null)
        {
            return ServiceResponse<OrderViewDTO>.FromError(new(HttpStatusCode.NotFound, "Order not found!", ErrorCodes.OrderNotFound));
        }
        order.Status = status;
        await _repository.UpdateAsync(order, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse<OrderViewDTO>> GetOrder(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        var order = await _repository.GetAsync<Order>(id, cancellationToken);
        if (order == null)
        {
            return ServiceResponse<OrderViewDTO>.FromError(new(HttpStatusCode.NotFound, "Order not found!", ErrorCodes.OrderNotFound));
        }

        if (!(requestingUser.Role == UserRoleEnum.Admin || order.UserId == requestingUser.Id))
        {
            return ServiceResponse<OrderViewDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admins and order owner can view order!", ErrorCodes.CannotViewOrder));
        }
 
        var viewDTO = new OrderViewDTO
        {
            Price = order.Price,
            PaymentMethod = order.PaymentMethod,
            Status = order.Status,
            Address = order.Address,
        };

        List<TeddyBuildDTO> teddies = await _repository.ListAsync(new TeddySpec(order.Id, 3), cancellationToken);
        viewDTO.teddies = teddies;
        return ServiceResponse<OrderViewDTO>.ForSuccess(viewDTO);

    }

    public async Task<ServiceResponse> PlaceOrder(OrderAddDTO order, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        /* First check if the requesting user exists */
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
        if (user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.UserNotFound));
        }

        /* Then check if the requesting user has a cart */
        var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
        if (cart == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotFound));
        }

        /* Cannot order empty cart */
        List<Teddy> teddies = await _repository.ListAsync(new TeddySpec2(cart.Id, true), cancellationToken);
        if (teddies.IsNullOrEmpty())
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Cannot order empty cart!", ErrorCodes.CannotOrderEmptyCart));
        }
        int sum = 0;
        foreach (var teddy in teddies)
        {
            var items = await _repository.ListAsync(new TeddyItemSpec(teddy), cancellationToken);
            if (items != null)
            {
                foreach (var teddyItem in items)
                {
                    sum += teddyItem.Price;
                    teddyItem.Quantity--;
                    teddyItem.Valability = Helpers.computeValability(teddyItem.Quantity);
                    await _repository.UpdateAsync(teddyItem, cancellationToken);
                }
            }
        }

        var order2 = new Order
        {
            Address = order.Address,
            Status = OrderStatus.Processing,
            PaymentMethod = order.PaymentMethod,
            UserId = user.Id,
            Price = sum
        };


        order2.Products = new List<Teddy>(teddies);
        await _repository.AddAsync(order2, cancellationToken);

        //await _repository.AddAsync(new Order
        //{
        //    Address = order.Address,
        //    Status = OrderStatus.Processing,
        //    PaymentMethod = order.PaymentMethod,
        //    UserId = user.Id,
        //    Price = sum
        //}, cancellationToken);

        foreach (var teddy in user.Cart.Products)
        {
            teddy.CartId = null;
            teddy.Cart = null;
        }
        user.Cart.Products = new List<Teddy> { };
        await _repository.UpdateAsync(user, cancellationToken);

        //var addedOrder = await _repository.GetAsync(new OrderSpec(previous_cart, false), cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}
