using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Extensions;
using BuildABear.Infrastructure.Services.Implementations;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuildABear.Backend.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class CartController : AuthorizedController
{
    private readonly ICartService _cartService;
    public CartController(IUserService userService, ICartService cartService) : base(userService)
    {
        _cartService = cartService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<PagedResponse<TeddyBuildDTO>>>> GetByCartId([FromQuery] PaginationQueryParams pagination, [FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _cartService.Get(pagination, id, false, currentUser.Result)) :
           this.ErrorMessageResult<PagedResponse<TeddyBuildDTO>>(currentUser.Error);
    }
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<PagedResponse<TeddyBuildDTO>>>> GetByUserId([FromQuery] PaginationQueryParams pagination, [FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _cartService.Get(pagination, id, true, currentUser.Result)) :
           this.ErrorMessageResult<PagedResponse<TeddyBuildDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<int>>> GetCartPriceByCartId([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _cartService.GetPrice(currentUser.Result, id, false)) :
           this.ErrorMessageResult<int>(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<int>>> GetCartPriceByUserId([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _cartService.GetPrice(currentUser.Result, id, true)) :
           this.ErrorMessageResult<int>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<int>>> GetCartPrice()
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _cartService.GetPrice(currentUser.Result)) :
           this.ErrorMessageResult<int>(currentUser.Error);
    }

}
