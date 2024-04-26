using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Responses;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Backend.Controllers;
using BuildABear.Core.Enums;
using BuildABear.Core.Errors;
using System.Net;
using BuildABear.Core.Entities;
using BuildABear.Core.Specifications;
using BuildABear.Core.Helpers;
using BuildABear.Core.Requests;

namespace BuildABear.Infrastructure.Services.Implementations;

public class TeddyItemService : ITeddyItemService { 
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IFileRepository _fileRepository;
    public TeddyItemService(IRepository<WebAppDatabaseContext> repository, IFileRepository fileRepository) {
        _repository = repository;
        _fileRepository = fileRepository;
    }
    private static string GetFileVendorDirectory(Guid userId) => Path.Join(userId.ToString(), IUserFileService.VendorFilesDirectory);
    private static string GetFileDirectory(Guid userId) => Path.Join(userId.ToString(), IUserFileService.UserFilesDirectory);
    public async Task<ServiceResponse> DeleteBySKU(TeddySkuDTO SKU, UserDTO? requestingUser, CancellationToken cancellationToken = default) {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin members can delete items!", ErrorCodes.CannotDeleteItem));
        }

        var searchItem = await _repository.GetAsync(new TeddyItemSpec(SKU.SKU), cancellationToken);
        if (searchItem == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Requested Teddy item not found!", ErrorCodes.ItemNotFound));
        }
        var item = await _repository.DeleteAsync<TeddyItem>(searchItem.Id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> Delete(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin members can delete items!", ErrorCodes.CannotDeleteItem));
        }

        var searchItem = await _repository.GetAsync<TeddyItem>(id, cancellationToken);
        if (searchItem == null) {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Requested Teddy item not found!", ErrorCodes.ItemNotFound));
        }
        var item = await _repository.DeleteAsync<TeddyItem>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<TeddyItemDTO>> GetItemBySKU(string SKU, CancellationToken cancellationToken = default) 
    {
        var item = await _repository.GetAsync(new TeddyItemSpec(SKU));
        if (item != null)
        {
            var vendor = await _repository.GetAsync(new VendorSpec(item.VendorId), cancellationToken);
            if(vendor != null)
            {
                var result = new TeddyItemDTO
                {
                    SKU = item.SKU,
                    Name = item.Name,
                    Description = item.Description,
                    Fabric = item.Fabric,
                    Color = item.Color,
                    Quantity = item.Quantity,
                    Category = item.ItemCategory,
                    Valability = item.Valability,
                    VendorName = vendor.Name,
                    Price = item.Price
                };
                return ServiceResponse<TeddyItemDTO>.ForSuccess(result);
            }
            return ServiceResponse<TeddyItemDTO>.FromError(new(HttpStatusCode.NotFound, "File not found!", ErrorCodes.ItemNotFound));
        }

        return ServiceResponse<TeddyItemDTO>.FromError(new(HttpStatusCode.NotFound, "Item not found!", ErrorCodes.ItemNotFound));

    }
    public async Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItemsByCategory(PaginationSearchQueryParams pagination, TeddyItemCategoryEnum category, CancellationToken cancellationToken = default) {
        var items = await _repository.PageAsync(pagination, new TeddyItemProjectionSpec(category), cancellationToken);
        return ServiceResponse<PagedResponse<BriefTeddyItemDTO>>.ForSuccess(items);
    }

    public async Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItems(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new TeddyItemProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<BriefTeddyItemDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItemsByVendor(VendorSearchQueryParams pagination, CancellationToken cancellationToken = default) {
        
        var result = await _repository.PageAsync(pagination, new TeddyItemProjectionSpec(pagination.id), cancellationToken);

        return ServiceResponse<PagedResponse<BriefTeddyItemDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<BriefTeddyItemDTO>> AddItem(TeddyItemAddDTO item, UserDTO requestingUser, CancellationToken cancellationToken = default) {

        if ((requestingUser != null && requestingUser.Role != UserRoleEnum.Vendor)) {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.Forbidden, "Only Enterprise members can publish new items!", ErrorCodes.CannotAddItem));
        }

        if (requestingUser == null) {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.InternalServerError, "Request user not found!", ErrorCodes.UserNotFound));
        }

        var vendorUser = await _repository.GetAsync(new UserSpec(requestingUser.Email));
        var searchVendor = await _repository.GetAsync(new VendorSpec((Guid) vendorUser.VendorId), cancellationToken);

        if (searchVendor!= null && !Helpers.isValidDate(DateTime.Now, searchVendor.ContractStartDate, searchVendor.ContractEndDate))
        {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.Forbidden, "Vendor contract expired!", ErrorCodes.ContractExpired));
        }

        var searchItem = await _repository.GetAsync(new TeddyItemSpec(item.compute_sku((Guid) vendorUser.VendorId)));
        if (searchItem != null)
        {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.Conflict, "Item already exists!", ErrorCodes.ItemAlreadyExists));
        }

        var fileName = _fileRepository.SaveFile(item.File, GetFileVendorDirectory((Guid)vendorUser.VendorId));

        if (fileName.Result == null)
        {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.InternalServerError, "Cannot add filename!", ErrorCodes.CannotAddFile));
        }

        await _repository.AddAsync(new TeddyItem
        {
            SKU = item.compute_sku((Guid) vendorUser.VendorId),
            Name = item.Name,
            Price = item.Price,
            Description = item.Description,
            Fabric = item.Fabric,
            Color = item.Color,
            Quantity = item.Quantity,
            ItemCategory = item.Category,
            VendorId = (Guid) vendorUser.VendorId,
            Vendor = searchVendor,
            Path = fileName.Result,
            FileName = item.FileName,
            Valability = Helpers.computeValability(item.Quantity)

        }, cancellationToken);

        var added_item = await _repository.GetAsync(new TeddyItemSpec(item.compute_sku((Guid)vendorUser.VendorId)), cancellationToken);

        return ServiceResponse<BriefTeddyItemDTO>.ForSuccess(new BriefTeddyItemDTO
        {
            Id = added_item.Id,
            SKU = added_item.SKU,
            Name = added_item.Name,
            Price = added_item.Price,
            Description = added_item.Description,
            Category = added_item.ItemCategory,
            Valability = added_item.Valability
        });
    }

    public async Task<ServiceResponse<BriefTeddyItemDTO>> GetItemDescById(Guid id, CancellationToken cancellationToken = default)
    {
        var item = await _repository.GetAsync<TeddyItem>(id, cancellationToken);
        if(item == null)
        {
            return ServiceResponse<BriefTeddyItemDTO>.FromError(new(HttpStatusCode.NotFound, "Item not found!", ErrorCodes.ItemNotFound));
        }
        var DTO = new BriefTeddyItemDTO()
        {
            Id = item.Id,
            SKU = item.SKU,
            Name = item.Name,
            Price = item.Price,
            Description = item.Description,
            Category = item.ItemCategory,
            Valability = item.Valability
        };
        return ServiceResponse<BriefTeddyItemDTO>.ForSuccess(DTO);
    }

    public async Task<ServiceResponse<FileDTO>> GetItemById(Guid id, CancellationToken cancellationToken = default)
    {
        var item = await _repository.GetAsync<TeddyItem>(id, cancellationToken);
        if (item == null)
        {
            return ServiceResponse<FileDTO>.FromError(new(HttpStatusCode.NotFound, "Item not found!", ErrorCodes.ItemNotFound));
        }

        var res =  _fileRepository.GetFile(Path.Join(Path.Join(item.VendorId.ToString(), IUserFileService.VendorFilesDirectory), item.Path), item.FileName).Result;

        return ServiceResponse<FileDTO>.ForSuccess(res);

    }
    public async Task<ServiceResponse> Update(TeddyItemUpdateDTO template, Guid id, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        var teddy = await _repository.GetAsync<TeddyItem>(new TeddyItemSpec(id), cancellationToken);
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);
        
        if(teddy == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Item not found!", ErrorCodes.ItemNotFound));
        }
        
        if(requestingUser == null || !(requestingUser.Role == UserRoleEnum.Admin || requestingUser.Role == UserRoleEnum.Vendor))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins and owner vendors can update item!", ErrorCodes.CannotUpdateItem));
        }

        if (requestingUser.Role == UserRoleEnum.Vendor && !(teddy.VendorId == user.VendorId)) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins and owner vendors can update item!", ErrorCodes.CannotUpdateItem));
        }

        var vendor = await _repository.GetAsync<Vendor>(teddy.VendorId, cancellationToken);
        if(vendor == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.InternalServerError, "Vendor not found!", ErrorCodes.VendorNotFound));
        }
        if (!Helpers.isValidDate(DateTime.Now, vendor.ContractStartDate, vendor.ContractEndDate)) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Vendor not found!", ErrorCodes.VendorNotFound));
        }

        teddy.Price = template.Price ?? teddy.Price;
        teddy.Description = template.Description ?? teddy.Description;
        teddy.Fabric = template.Fabric ?? teddy.Fabric;
        teddy.Color = template.Color ?? teddy.Color;
        teddy.Quantity = template.Quantity ?? teddy.Quantity;
        teddy.Valability = Helpers.computeValability(teddy.Quantity); // recompute valability if quantity has changed
        await _repository.UpdateAsync(teddy, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> UpdateWithId(TeddyItemUpdateIdDTO template, UserDTO? requestingUser, CancellationToken cancellationToken = default) {
        var teddy = await _repository.GetAsync<TeddyItem>(new TeddyItemSpec(template.Id), cancellationToken);
        var user = await _repository.GetAsync<User>(requestingUser.Id, cancellationToken);

        if (teddy == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Item not found!", ErrorCodes.ItemNotFound));
        }

        if (requestingUser == null || !(requestingUser.Role == UserRoleEnum.Admin || requestingUser.Role == UserRoleEnum.Vendor))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins and owner vendors can update item!", ErrorCodes.CannotUpdateItem));
        }

        if (requestingUser.Role == UserRoleEnum.Vendor && !(teddy.VendorId == user.VendorId))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins and owner vendors can update item!", ErrorCodes.CannotUpdateItem));
        }

        var vendor = await _repository.GetAsync<Vendor>(teddy.VendorId, cancellationToken);
        if (vendor == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.InternalServerError, "Vendor not found!", ErrorCodes.VendorNotFound));
        }
        if (!Helpers.isValidDate(DateTime.Now, vendor.ContractStartDate, vendor.ContractEndDate))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Vendor not found!", ErrorCodes.VendorNotFound));
        }

        teddy.Price = template.Price ?? teddy.Price;
        teddy.Description = template.Description ?? teddy.Description;
        teddy.Fabric = template.Fabric ?? teddy.Fabric;
        teddy.Color = template.Color ?? teddy.Color;
        teddy.Quantity = template.Quantity ?? teddy.Quantity;
        teddy.Valability = Helpers.computeValability(teddy.Quantity); // recompute valability if quantity has changed
        await _repository.UpdateAsync(teddy, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
