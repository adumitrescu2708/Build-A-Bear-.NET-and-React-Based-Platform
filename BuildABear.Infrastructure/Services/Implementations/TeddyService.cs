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

        var template = _repository.GetAsync<TeddyTemplate>(templateId, cancellationToken);
        if(template.Result == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Template not existing!", ErrorCodes.NonexistingTemplate));
        }

        ICollection<TeddyItem> items = GetItemsByIds(teddy.ItemsIds, cancellationToken);
        ICollection<Guid> correctIds = new HashSet<Guid>();
        foreach (var item in items) { 
            correctIds.Add(item.Id);
        }
        var user = _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
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

        if (teddy == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || teddy.Cart.UserId == requestingUser.Id))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can delete teddy!", ErrorCodes.CannotDeleteTeddy));
        }

        await _repository.DeleteAsync<Teddy>(id, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<TeddyBuildDTO>> GetTeddy(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var teddy = await _repository.GetAsync<Teddy>(id);

        if (teddy == null)
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || teddy.Cart.UserId == requestingUser.Id))
        {
            return ServiceResponse<TeddyBuildDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can view teddy!", ErrorCodes.CannotViewTeddy));
        }

        var result = await _repository.GetAsync(new TeddySpec(id, false), cancellationToken);
        
        return ServiceResponse<TeddyBuildDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<Guid>> UpdateTeddy(Guid id, TeddyUpdateDTO teddyTemp, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var teddy = await _repository.GetAsync<Teddy>(id);
        
        if(teddy == null)
        {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Teddy not existing!", ErrorCodes.TeddyNotExisting));
        }

        if (!(requestingUser.Role == Core.Enums.UserRoleEnum.Admin || teddy.Cart.UserId == requestingUser.Id)) {
            return ServiceResponse<Guid>.FromError(new(HttpStatusCode.Forbidden, "Only admin users and parent user can update teddy!", ErrorCodes.CannotUpdateTeddy));
        }

        if (teddyTemp.TeddyTemplateId != null) {
            var template = _repository.GetAsync<TeddyTemplate>((Guid) teddyTemp.TeddyTemplateId);
            if (template.Result == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Template not existing!", ErrorCodes.NonexistingTemplate));
            }
        }

        teddy.Name = teddyTemp.Name ?? teddy.Name;
        teddy.Filling = teddyTemp.Filling ?? teddy.Filling;
        teddy.TeddyTemplateId = teddyTemp.TeddyTemplateId ?? teddy.TeddyTemplateId;
        ICollection<TeddyItem> items = GetItemsByIds(teddyTemp.ItemsIds, cancellationToken);
        teddy.Items = items;
        await _repository.UpdateAsync(teddy, cancellationToken);

        return ServiceResponse<Guid>.ForSuccess(teddy.Id);
    }
}
