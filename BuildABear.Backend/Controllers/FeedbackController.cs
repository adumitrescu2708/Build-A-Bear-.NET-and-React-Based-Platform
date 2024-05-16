using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuildABear.Backend.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class FeedbackController : AuthorizedController
{
    private readonly IUserService _userService;
    public FeedbackController(IUserService userService) : base(userService)  => _userService = userService;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<BriefTeddyItemDTO>>> Add([FromForm] TeddyItemAddDTO form) { 
    }
}
