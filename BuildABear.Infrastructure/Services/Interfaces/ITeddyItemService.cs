using BuildABear.Backend.Controllers;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Enums;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface ITeddyItemService
{
    public Task<ServiceResponse<BriefTeddyItemDTO>> AddItem(TeddyItemAddDTO item, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItems(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<TeddyItemDTO>> GetItemBySKU(string SKU, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> Delete(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItemsByCategory(PaginationSearchQueryParams pagination, TeddyItemCategoryEnum category, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BriefTeddyItemDTO>>> GetItemsByVendor(VendorSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<BriefTeddyItemDTO>> GetItemDescById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<FileDTO>> GetItemById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> Update(TeddyItemUpdateDTO template, Guid id, UserDTO? requestingUser, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> UpdateWithId(TeddyItemUpdateIdDTO template, UserDTO? requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteBySKU(TeddySkuDTO SKU, UserDTO? requestingUser, CancellationToken cancellationToken = default);
}
