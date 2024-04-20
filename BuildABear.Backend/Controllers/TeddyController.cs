using Microsoft.AspNetCore.Mvc;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Infrastructure.Authorization;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace BuildABear.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TeddyController : AuthorizedController
{
    private readonly ITeddyService _teddyService;
    public TeddyController(IUserService userService, ITeddyService teddyService) : base(userService) {
        _teddyService = teddyService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<Guid>>> Build([FromBody] TeddyBuildDTO teddy)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _teddyService.AddTeddy(teddy, currentUser.Result)) :
           this.ErrorMessageResult<Guid>(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse<Guid>>> Update([FromBody] TeddyUpdateDTO teddy, [FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _teddyService.UpdateTeddy(id, teddy, currentUser.Result)) :
            this.ErrorMessageResult<Guid>(currentUser.Error);

    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _teddyService.DeleteTeddy(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<TeddyBuildDTO>>> Get([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
           this.FromServiceResponse(await _teddyService.GetTeddy(id, currentUser.Result)) :
            this.ErrorMessageResult<TeddyBuildDTO>(currentUser.Error);

    }
}

 