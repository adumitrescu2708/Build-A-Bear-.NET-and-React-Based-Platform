using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Enums;
using BuildABear.Core.Errors;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Entities;
using System.Net;
using BuildABear.Core.Specifications;
using BuildABear.Core.Requests;
using BuildABear.Core.Helpers;

namespace BuildABear.Infrastructure.Services.Implementations;

public class VendorService : IVendorService
{
    IRepository<WebAppDatabaseContext> _repository;
    public VendorService(IRepository<WebAppDatabaseContext> repository) {
        _repository = repository;
    }
    public async Task<ServiceResponse> DeleteVendor(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        /* Only admin users can delete vendors */
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin users can remove vendors!", ErrorCodes.CannotDelete));
        }

        /* Only admin users can delete vendors */
        var result = await _repository.GetAsync(new VendorSpec(id), cancellationToken);
        if (result == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Vendor not found!", ErrorCodes.VendorNotFound));
        }

        /* Vendors can be deleted only if their contract has expired */
        if (Helpers.isValidDate(DateTime.Now, result.ContractStartDate, result.ContractEndDate)) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Vendor still under contract!", ErrorCodes.CannotDeleteVendorUnderContract));
        }

        await _repository.DeleteAsync<Vendor>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse<VendorViewDTO>> AddVendor(VendorAddDTO form, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        /* Only admin users can add vendors. */
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse<VendorViewDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add vendors!", ErrorCodes.CannotAdd));
        }

        /* Cannot add 2 vendor users with the same email address. */
        var result = await _repository.GetAsync(new VendorSpec(form.Email), cancellationToken);
        if (result != null)
        {
            return ServiceResponse<VendorViewDTO>.FromError(new(HttpStatusCode.Conflict, "The vendor already exists!", ErrorCodes.VendorAlreadyExists));
        }

        /* Add vendor to  database */
        await _repository.AddAsync(new Vendor
        {
            Name = form.Name,
            Email = form.Email,
            PhoneNumber = form.PhoneNumber,
            Address = form.Address,
            ContractStartDate = form.ContractStartDate,
            ContractEndDate = form.ContractEndDate,
            PaymentMethod = form.PaymentMethod,
            ContractRenewalTerms = form.ContractRenewalTerms
        }, cancellationToken);

        /* Return vendor info */
        var added_vendor = await _repository.GetAsync(new VendorSpec(form.Email),cancellationToken);
        if(added_vendor == null)
            return ServiceResponse<VendorViewDTO>.FromError(new(HttpStatusCode.Forbidden, "Error while adding vendor!", ErrorCodes.CannotAdd));
        else
            return ServiceResponse<VendorViewDTO>.ForSuccess(new()
            {

                Id = added_vendor.Id,
                Name = added_vendor.Name,
                Email = added_vendor.Email,
                Address = added_vendor.Address
            });
    }
    public async Task<ServiceResponse<PagedResponse<VendorBriefView>>> GetVendors(PaginationSearchQueryParams pagination, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new VendorProjection(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<VendorBriefView>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<VendorBriefView>> GetVendor(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new VendorProjection(id), cancellationToken);
        return result != null ?
            ServiceResponse<VendorBriefView>.ForSuccess(result) :
            ServiceResponse<VendorBriefView>.FromError(new(HttpStatusCode.NotFound, "Vendor not found!", ErrorCodes.VendorNotFound));
    }
    public async Task<ServiceResponse<VendorBriefView>> GetVendorByEmail(string email, CancellationToken cancellationToken = default) {
        var result = await _repository.GetAsync(new VendorSpec(email), cancellationToken);
        
        return result != null ?
            ServiceResponse<VendorBriefView>.ForSuccess(new VendorBriefView
            { 
                Name = result.Name,
                Email = result.Email,
                Address = result.Address,
            }) :
            ServiceResponse<VendorBriefView>.FromError(new(HttpStatusCode.NotFound, "Vendor not found!", ErrorCodes.VendorNotFound));
    }

    public async Task<ServiceResponse<VendorContractDTO>> GetVendorContract(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var user = await _repository.GetAsync<User>(requestingUser.Id);
        var result = await _repository.GetAsync(new VendorContractSpec(id), cancellationToken);
        if (result == null)
        {
            return ServiceResponse<VendorContractDTO>.FromError(new(HttpStatusCode.NotFound, "Vendor not found!", ErrorCodes.VendorNotFound));
        }

        if (!(requestingUser.Role == UserRoleEnum.Admin || user.VendorId == id))
        {
            return ServiceResponse<VendorContractDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admins and own vendor can see contract info!", ErrorCodes.CannotViewContract));
        }

        return ServiceResponse<VendorContractDTO>.ForSuccess(result);
    }
    public async Task<ServiceResponse> UpdateVendorContract(Guid id, VendorContractDTO contract, UserDTO requestingUser, CancellationToken cancellationToken = default) {
        if(!(requestingUser.Role == UserRoleEnum.Admin))
        {
            return ServiceResponse<VendorContractDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admins can update contract info!", ErrorCodes.CannotViewContract));
        }
        var user = await _repository.GetAsync(new VendorSpec(id));
        if (user == null)
        {
            return ServiceResponse<VendorContractDTO>.FromError(new(HttpStatusCode.NotFound, "Contract not found!", ErrorCodes.VendorNotFound));
        }
        
        if (user != null) {
            user.ContractEndDate = contract.ContractEndDate ?? user.ContractEndDate;
            user.ContractStartDate = contract.ContractStartDate ?? user.ContractStartDate;
            user.ContractRenewalTerms = contract.ContractRenewalTerms ?? user.ContractRenewalTerms;
            user.PaymentMethod = contract.PaymentMethod ?? user.PaymentMethod;
            await _repository.UpdateAsync(user, cancellationToken);
        }
        return ServiceResponse.ForSuccess();
    }
}
