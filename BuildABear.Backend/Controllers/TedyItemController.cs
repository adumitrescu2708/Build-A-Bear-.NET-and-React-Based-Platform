using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BuildABear.Core.Responses;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Infrastructure.Extensions;
using BuildABear.Core.Requests;
using System.Net.Mime;
using BuildABear.Core.Enums;

namespace BuildABear.Backend.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class TeddyItemController : AuthorizedController
{
    private const long MaxFileSize = 128 * 1024 * 1024;
    private readonly ITeddyItemService _teddyItemService;
    public TeddyItemController(IUserService userService, ITeddyItemService teddyItemService) : base(userService)
    {
        _teddyItemService = teddyItemService;
    }

    /// <summary>
    ///     This route is used for adding Teddy Items. On success, will return brief info on the added item, and error in the following
    ///   cases:
    ///     - Only enterprise users are allowed to add teddy items
    ///     - The enterprise user cannot add items if its vendor's contract is expired
    ///     - Cannot add 2 items with the same resulted SKU
    /// </summary>
    /// <param name="form"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxFileSize)] // Sets the maximum size limit for the form body to override the default value
    [RequestSizeLimit(MaxFileSize)] // Sets the maximum size limit for the entire request to override the default value
    public async Task<ActionResult<RequestResponse<BriefTeddyItemDTO>>> Add([FromForm] TeddyItemAddDTO form)
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.AddItem(form, currentUser.Result)) :
            this.ErrorMessageResult<BriefTeddyItemDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<BriefTeddyItemDTO>>>> Get([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.GetItems(pagination)) :
            this.ErrorMessageResult<PagedResponse<BriefTeddyItemDTO>>(currentUser.Error);
    }

    /// <summary>
    ///     This route is used for extracting brief info on teddy item. Returns info on success and error in the cases:
    ///         - Specified Teddy Item cannot be found in the database
    /// </summary>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<BriefTeddyItemDTO>>> GetInfoById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.GetItemDescById(id)) :
            this.ErrorMessageResult<BriefTeddyItemDTO>(currentUser.Error);
    }
    /// <summary>
    ///     This is a spearate route used for extracting file on teddy item. Returns info on success and error in the cases:
    ///         - Specified Teddy Item cannot be found in the database
    /// </summary>
    [Authorize]
    [Produces(MediaTypeNames.Application.Octet, MediaTypeNames.Application.Json)] // Sets the possible response MIME types because on success a binary file is send while on error a error JSON is send.
    [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> GetFileById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();
        var response = await _teddyItemService.GetItemById(id);

        return response.Result != null ?
            File(response.Result.Stream, MediaTypeNames.Application.Octet, response.Result.Name) :
            this.ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    ///     This route returns more info on a specified teddy item.
    /// </summary>
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<TeddyItemDTO>>> GetBySKU([FromBody] TeddySkuDTO sku)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.GetItemBySKU(sku.SKU)) :
            this.ErrorMessageResult<TeddyItemDTO>(currentUser.Error);
    }

    /// <summary>
    ///     This route returns more info on a specified teddy item. Returns success on error in the following cases:
    ///         - The specified teddy item is not found in the database
    ///         - Only admin users and enterprise users can update teddy item
    ///         - In case of an enterprise user with a corresponding vendor with an expired contract
    /// </summary>
    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] TeddyItemUpdateDTO template, [FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.Update(template, id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] TeddyItemUpdateIdDTO template)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.UpdateWithId(template, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<BriefTeddyItemDTO>>>> GetByCategory([FromQuery] TeddyItemCategoryEnum category, [FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.GetItemsByCategory(pagination, category)) :
            this.ErrorMessageResult<PagedResponse<BriefTeddyItemDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<BriefTeddyItemDTO>>>> GetByVendor([FromQuery] VendorSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.GetItemsByVendor(pagination)) :
            this.ErrorMessageResult<PagedResponse<BriefTeddyItemDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.Delete(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<RequestResponse>> DeleteBySKU([FromQuery] TeddySkuDTO SKU)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyItemService.DeleteBySKU(SKU, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
