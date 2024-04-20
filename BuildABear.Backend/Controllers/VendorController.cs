using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BuildABear.Core.Responses;
using Microsoft.AspNetCore.Authorization;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Infrastructure.Extensions;
using BuildABear.Core.Requests;
using BuildABear.Core.Entities;
using System.Numerics;
namespace BuildABear.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class VendorController : AuthorizedController
{
    private IVendorService VendorService;
    public VendorController(IUserService userService, IVendorService vendorService) : base(userService)
    {
        VendorService = vendorService;
    }
    
    /// <summary>
    ///     Authorized route for adding a vendor to the database. The result is either a view of the added vendor, or an error
    ///    in the following cases:
    ///        - Only an admin user can add vendors
    ///        - Two vendors with the same email address cannot exist
    ///        - Bad formatting of email address and phone number in the post request
    ///        - Cannot add vendor to the database
    /// </summary>

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<VendorViewDTO>>> Add([FromBody] VendorAddDTO form) {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            this.FromServiceResponse<VendorViewDTO>(await VendorService.AddVendor(form, currentUser.Result)) :
            this.ErrorMessageResult<VendorViewDTO>(currentUser.Error);
    }

    /// <summary>
    ///     Authorized route for deleting a vendor from the database. The result is either success, or an error
    ///    in the following cases:
    ///        - Only an admin user can delete vendors
    ///        - Vendors cannot be deleted while still under contract
    ///        - Specified vendor is not found in the database
    ///     When removing a vendor from the database, all the associated enterprise users will be deleted.
    /// </summary>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id) {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.DeleteVendor(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    ///      Authorized route for getting restricted info on vendor by id. Any user can view vendor info. The results is either
    ///     info on vendor or error in the following case:
    ///         - Specified vendor is not found in the database
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<VendorBriefView>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.GetVendor(id)) :
            this.ErrorMessageResult<VendorBriefView>(currentUser.Error);
    }

    /// <summary>
    ///      Authorized route for getting restricted info on vendor by vendor email. Any user can view vendor info. The results is either
    ///     info on vendor or error in the following case:
    ///         - Specified vendor is not found in the database
    /// </summary>
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<VendorBriefView>>> GetByEmail([FromBody] VendorEmail email)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.GetVendorByEmail(email.email)) :
            this.ErrorMessageResult<VendorBriefView>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<VendorBriefView>>>> Get([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.GetVendors(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<VendorBriefView>>(currentUser.Error);
    }

    /// <summary>
    ///     Previous routes return brief info on a specific vendor, but the contract details should be kept authorized.
    ///   This way, based on the vendor's index this route will return contract info or errors in the following cases:
    ///         - Specified vendor is not found in the database
    ///         - Only admin users and the enterprise users within the specified vendor can view contract info
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<VendorContractDTO>>> GetContractById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.GetVendorContract(id, currentUser.Result)) :
            this.ErrorMessageResult<VendorContractDTO>(currentUser.Error);
    }

    /// <summary>
    ///     Route for updating contract for specified vendors. Returns success or error in the following cases:
    ///         - Specified vendor is not found in the database
    ///         - Only admin users can update contracts
    /// </summary>
    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> UpdateContractById([FromBody] VendorContractDTO contract, [FromRoute] Guid id) // The FromBody attribute indicates that the parameter is deserialized from the JSON body.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await VendorService.UpdateVendorContract(id, contract, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
