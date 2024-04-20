using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Core.Requests;
namespace BuildABear.Infrastructure.Services.Interfaces;

public interface IVendorService
{
    public Task<ServiceResponse<VendorViewDTO>> AddVendor(VendorAddDTO form, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteVendor(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<VendorBriefView>> GetVendor(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<VendorBriefView>> GetVendorByEmail(string email, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<VendorBriefView>>> GetVendors(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<VendorContractDTO>> GetVendorContract(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateVendorContract(Guid id, VendorContractDTO contract, UserDTO requestingUser, CancellationToken cancellationToken = default);
}
