using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Enums;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Extensions;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuildABear.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class OrderController : AuthorizedController
{
    private readonly IOrderService _orderService;
    public OrderController(IUserService userService, IOrderService orderService) : base(userService)
    {
        _orderService = orderService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> PlaceOrder([FromBody] OrderAddDTO order)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _orderService.PlaceOrder(order, currentUser.Result)) :
           this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<OrderViewDTO>>> GetOrder([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _orderService.GetOrder(id, currentUser.Result)) :
           this.ErrorMessageResult<OrderViewDTO>(currentUser.Error);
    }


    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> UpdateOrder([FromRoute] Guid id, [FromBody] OrderStatus status)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _orderService.UpdateOrder(id, status, currentUser.Result)) :
           this.ErrorMessageResult(currentUser.Error);
    }


}
