using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Authorization;
using BuildABear.Infrastructure.Extensions;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuildABear.Backend.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class FeedbackController : AuthorizedController
{
    private readonly IUserService _userService;
    private readonly IFeedbackService _feedbackService;
    public FeedbackController(IUserService userService, IFeedbackService feedbackService) : base(userService)
    {
        _userService = userService;
        _feedbackService = feedbackService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FeedbackDTO form) {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _feedbackService.Add(form)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
