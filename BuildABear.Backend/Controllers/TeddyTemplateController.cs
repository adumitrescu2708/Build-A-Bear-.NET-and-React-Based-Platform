using BuildABear.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BuildABear.Core.Responses;
using BuildABear.Core.DataTransferObjects.TeddyTemplate;
using BuildABear.Infrastructure.Extensions;
using System.Net.Mime;
using BuildABear.Core.Requests;

namespace BuildABear.Backend.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class TeddyTemplateController : AuthorizedController
{
    private readonly ITeddyTemplateService _teddyTemplateService;
    public TeddyTemplateController(ITeddyTemplateService templateService, IUserService userService) : base(userService) {
        _teddyTemplateService = templateService;
    }

    /// <summary>
    /// Route for adding teddy template. Only admin users can add templates. Default, there are 8 templates available.
    /// There cannot exist 2 teddy templates with the same name. Returns an id
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<Guid>>> Add([FromForm] TeddyTemplateAddDTO template) {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyTemplateService.AddTeddyTemplate(template, currentUser.Result)) :
            this.ErrorMessageResult<Guid>(currentUser.Error);
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [Produces(MediaTypeNames.Application.Octet, MediaTypeNames.Application.Json)] // Sets the possible response MIME types because on success a binary file is send while on error a error JSON is send.
    [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)] // On success a FileResult should be send. 
    public async Task<ActionResult<RequestResponse>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        var response = await _teddyTemplateService.GetTemplateById(id);
        return response.Result != null ?
            File(response.Result.Stream, MediaTypeNames.Application.Octet, response.Result.Name) :
            this.ErrorMessageResult(currentUser.Error);
    }

    /// <summary>
    /// Route for delting a teddy template. Returns success or error in the following cases:
    ///     - Specified id is not found
    ///     - Only admin users can add teddies
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> DeleteById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyTemplateService.RemoveTeddyTemplate(id, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<TeddyTemplateViewDTO>>>> Get ([FromQuery] PaginationSearchQueryParams pagination) {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _teddyTemplateService.GetAll(pagination)) :
            this.ErrorMessageResult<PagedResponse<TeddyTemplateViewDTO>>(currentUser.Error);
    }

}
