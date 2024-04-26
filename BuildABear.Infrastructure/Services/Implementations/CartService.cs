using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Entities;
using BuildABear.Core.Errors;
using System.Net;
using BuildABear.Core.Specifications;
using BuildABear.Core.Requests;
using BuildABear.Core.Helpers;

namespace BuildABear.Infrastructure.Services.Implementations;

public class CartService : ICartService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public CartService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse<PagedResponse<TeddyViewDTO>>> Get(PaginationQueryParams pagination, Guid id, bool isUserId, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        if (!isUserId)
        {
            var cart = await _repository.GetAsync<Cart>(id, cancellationToken);
            if (cart == null)
            {
                return ServiceResponse<PagedResponse<TeddyViewDTO>>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotExisting));
            }
            if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || cart.UserId == requestingUser.Id))
            {
                return ServiceResponse<PagedResponse<TeddyViewDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only admins and self users can view cart!", ErrorCodes.CannotViewCart));
            }

            var result = await _repository.PageAsync(pagination, new TeddyViewSpec(id, 1), cancellationToken);
            return ServiceResponse<PagedResponse<TeddyViewDTO>>.ForSuccess(result);
        }
        else 
        {
            var user = await _repository.GetAsync<User>(id, cancellationToken);
            if (user == null) 
            {
                return ServiceResponse<PagedResponse<TeddyViewDTO>>.FromError(new(HttpStatusCode.NotFound, "User not existing!", ErrorCodes.UserNotFound));
            }
            var cart = await _repository.GetAsync(new CartSpec(id), cancellationToken);
            if (cart == null)
            {
                return ServiceResponse<PagedResponse<TeddyViewDTO>>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotExisting));
            }
            if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || cart.UserId == requestingUser.Id))
            {
                return ServiceResponse<PagedResponse<TeddyViewDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only admins and self users can view cart!", ErrorCodes.CannotViewCart));
            }
            var result = await _repository.PageAsync(pagination, new TeddyViewSpec(cart.Id, 1), cancellationToken);
            return ServiceResponse<PagedResponse<TeddyViewDTO>>.ForSuccess(result);
        }
    }

    public async Task<ServiceResponse<int>> GetPrice(UserDTO requestingUser, Guid? id = default, bool? isUserId = default,CancellationToken cancellationToken = default)
    {
        var reqUser = await _repository.GetAsync<User>(requestingUser.Id);
        if(reqUser == null)
        {
            return ServiceResponse<int>.FromError(new(HttpStatusCode.NotFound, "User not existing!", ErrorCodes.UserNotFound));
        }

        if (id != null)
        {
            if (!((bool)isUserId))
            {
                var cart = await _repository.GetAsync<Cart>((Guid)id, cancellationToken);
                if (cart == null)
                {
                    return ServiceResponse<int>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotExisting));
                }
                if(!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || cart.UserId == requestingUser.Id))
                {
                    return ServiceResponse<int>.FromError(new(HttpStatusCode.Forbidden, "Only admins and cart owner can view cart!", ErrorCodes.CannotViewCart));
                }

                List<Teddy> teddies = await _repository.ListAsync(new TeddySpec2(cart.Id, true), cancellationToken);

                int sum = 0;
                foreach (var teddy in teddies)
                {
                    var items = await _repository.ListAsync(new TeddyItemSpec(teddy), cancellationToken);
                    if (items != null)
                    {
                        foreach (var teddyItem in items)
                        {
                            sum += teddyItem.Price;
                        }
                    }
                }
                return ServiceResponse<int>.ForSuccess(sum);
            }
            else {
                var user = await _repository.GetAsync<User>((Guid)id, cancellationToken);
                if (user == null)
                {
                    return ServiceResponse<int>.FromError(new(HttpStatusCode.NotFound, "User not existing!", ErrorCodes.UserNotFound));
                }

                if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || user.Id == requestingUser.Id))
                {
                    return ServiceResponse<int>.FromError(new(HttpStatusCode.Forbidden, "Only admins and cart owner can view cart!", ErrorCodes.CannotViewCart));
                }

                var cart = await _repository.GetAsync(new CartSpec((Guid)id), cancellationToken);
                //var cart = user.MainCart;
                if (cart == null)
                {
                    return ServiceResponse<int>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotExisting));
                }
                List<Teddy> teddies = await _repository.ListAsync(new TeddySpec2(cart.Id, true), cancellationToken);
                int sum = 0;
                foreach (var teddy in teddies)
                {
                    var items = await _repository.ListAsync(new TeddyItemSpec(teddy), cancellationToken);
                    if (items != null)
                    {
                        foreach (var teddyItem in items)
                        {
                            sum += teddyItem.Price;
                        }
                    }
                }
                return ServiceResponse<int>.ForSuccess(sum);
            }
            
        }
        else 
        {
            var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
            if (cart == null)
            {
                return ServiceResponse<int>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotExisting));
            }
            List<Teddy> teddies = await _repository.ListAsync(new TeddySpec2(cart.Id, true), cancellationToken);
            int sum = 0;
            foreach (var teddy in teddies)
            {
                var items = await _repository.ListAsync(new TeddyItemSpec(teddy), cancellationToken);
                if (items != null)
                {
                    foreach (var teddyItem in items)
                    {
                        sum += teddyItem.Price;
                    }
                }
            }
            return ServiceResponse<int>.ForSuccess(sum);
        }
    }
}
