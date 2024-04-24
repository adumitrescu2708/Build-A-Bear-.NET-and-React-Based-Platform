using Ardalis.Specification;
using BuildABear.Backend.Controllers;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using BuildABear.Core.Enums;
using BuildABear.Core.Errors;
using BuildABear.Core.Helpers;
using BuildABear.Core.Responses;
using BuildABear.Core.Specifications;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using System.Net;

namespace BuildABear.Infrastructure.Services.Implementations;

public class TeddyService : ITeddyService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public TeddyService(IRepository<WebAppDatabaseContext> repository) { 
        _repository = repository;
    }

    public ICollection<TeddyItem> GetItemsByIds(ICollection<Guid>? ItemsIds, CancellationToken cancellationToken = default) {
        ICollection<TeddyItem> items = new List<TeddyItem>();
        if (ItemsIds != null)
        {
            foreach (var itemId in ItemsIds)
            {
                var teddyItem = _repository.GetAsync<TeddyItem>(itemId, cancellationToken);
                if (teddyItem.Result != null)
                {
                    items.Add(teddyItem.Result);
                }
            }
        }
        return items;
    }
    public async Task<ServiceResponse<Guid>> AddTeddy(TeddyBuildDTO teddy, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        Guid templateId = teddy.TeddyTemplateId;

        /* First check if the requesting user exists */
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
        if (user == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.UserNotFound));
        }
        /* Then check if the requested template exists */
        var template = await _repository.GetAsync<TeddyTemplate>(templateId, cancellationToken);
        if(template == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Template not existing!", ErrorCodes.NonexistingTemplate));
        }
        
        /* Then check if the requested teddy items exist and are avilable */
        ICollection<TeddyItem> items = new List<TeddyItem>();
        if (teddy.ItemsIds != null)
        {
            foreach (var itemId in teddy.ItemsIds)
            {
                var teddyItem = await _repository.GetAsync<TeddyItem>(itemId, cancellationToken);
                if(teddyItem == null)
                {
                    return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy Item not found!", ErrorCodes.ItemNotFound));
                }
                if(teddyItem.Valability == TeddyItemValability.OutOfStock)
                {
                    return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy Item not available!", ErrorCodes.ItemUnavailable));
                }

                 items.Add(teddyItem);
            }
        }

        ICollection<Guid> correctIds = new HashSet<Guid>();
        foreach (var item in items) { 
            correctIds.Add(item.Id);
        }

        /* Then check if the requesting user has a cart */
        var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
        if (cart == null) 
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotFound));
        }
        Teddy new_teddy = new Teddy()
        {
            Name = teddy.Name,
            Filling = teddy.Filling,
            TeddyTemplateId = templateId,
            Items = items,
            CartId = cart.Id
        };

        await _repository.AddAsync(new_teddy, cancellationToken);

        return ServiceResponse<Guid>.ForSuccess(new_teddy.Id);
    }

    public async Task<ServiceResponse> DeleteTeddy(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        var teddy = await _repository.GetAsync<Teddy>(id);

        /* First check if given teddy exists */
        if (teddy == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        /* Then check if the requesting user has a cart */
        var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
        if (cart == null)
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotFound));
        }

        if (teddy.OrderId != null)
        {
            var order = await _repository.GetAsync<Order>((Guid)teddy.OrderId, cancellationToken);
            /* Then check permissions */
            if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || order.UserId == requestingUser.Id))
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can delete teddy!", ErrorCodes.CannotDeleteTeddy));
            }
        }
        else {
            /* Then check permissions */
            if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || (teddy.CartId == cart.Id)))
            {
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can delete teddy!", ErrorCodes.CannotDeleteTeddy));
            }
        }
            


        await _repository.DeleteAsync<Teddy>(id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<TeddyBuildDTO>> GetTeddy(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        /* First check if the requesting user exists */
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
        if (user == null)
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.UserNotFound));
        }

        /* Then check if the requested teddy exists */
        var teddy = await _repository.GetAsync<Teddy>(id);
        if (teddy == null)
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        /* Then check if the requesting user has a cart */
        var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
        if (cart == null)
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotFound));
        }

        /* Then check permissions */
        if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || teddy.CartId == cart.Id))
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can view teddy!", ErrorCodes.CannotViewTeddy));
        }

        var result = await _repository.GetAsync(new TeddySpec(id, 2), cancellationToken);
        
        return ServiceResponse<TeddyBuildDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<Guid>> UpdateTeddy(Guid id, TeddyUpdateDTO teddyTemp, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        /* First check if the requesting user exists */
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
        if (user == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.UserNotFound));
        }

        /* Then check if teddy exists */
        var teddy = await _repository.GetAsync<Teddy>(id);
        if(teddy == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        /* Then check if the requesting user has a cart */
        var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
        if (cart == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Cart not existing!", ErrorCodes.CartNotFound));
        }

        /* Then check permissions */
        if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || teddy.CartId == cart.Id)) {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can update teddy!", ErrorCodes.CannotUpdateTeddy));
        }

        /* Then check if given teddy template exists */
        if (teddyTemp.TeddyTemplateId != null) {
            var template = _repository.GetAsync<TeddyTemplate>((Guid) teddyTemp.TeddyTemplateId);
            if (template.Result == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Template not existing!", ErrorCodes.NonexistingTemplate));
            }
        }

        /* Then check if the requested teddy items exist and are avilable */
        ICollection<TeddyItem> items = new List<TeddyItem>();
        if (teddyTemp.ItemsIds != null)
        {
            foreach (var itemId in teddyTemp.ItemsIds)
            {
                var teddyItem = await _repository.GetAsync<TeddyItem>(itemId, cancellationToken);
                if (teddyItem == null)
                {
                    return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy Item not found!", ErrorCodes.ItemNotFound));
                }
                if (teddyItem.Valability == TeddyItemValability.OutOfStock)
                {
                    return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy Item not available!", ErrorCodes.ItemUnavailable));
                }

                items.Add(teddyItem);
            }
        }

        teddy.Name = teddyTemp.Name ?? teddy.Name;
        teddy.Filling = teddyTemp.Filling ?? teddy.Filling;
        teddy.TeddyTemplateId = teddyTemp.TeddyTemplateId ?? teddy.TeddyTemplateId;
        teddy.Items = items;
        await _repository.UpdateAsync(teddy, cancellationToken);

        return ServiceResponse<Guid>.ForSuccess(teddy.Id);
    }
}
