using System.Security.Claims;
using BuildABear.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Core.Enums;
using System.Data;
using System.Text.Json;
using Ardalis.SmartEnum.SystemTextJson;

namespace BuildABear.Infrastructure.Authorization;

/// <summary>
/// This abstract class is used as a base class for controllers that need to get current information about the user from the database.
/// </summary>
public abstract class AuthorizedController : ControllerBase
{
    private UserClaims? _userClaims;
    protected readonly IUserService UserService;

    protected AuthorizedController(IUserService userService) => UserService = userService;

    /// <summary>
    /// This method extracts the claims from the JWT into an object.
    /// It also caches the object if used a second time.
    /// </summary>
    protected UserClaims ExtractClaims()
    {
        if (_userClaims != null)
        {
            return _userClaims;
        }

        var enumerable = User.Claims.ToList();
        var userId = enumerable.Where(x => x.Type == ClaimTypes.NameIdentifier).Select(x => Guid.Parse(x.Value)).FirstOrDefault();
        var email = enumerable.Where(x => x.Type == ClaimTypes.Email).Select(x => x.Value).FirstOrDefault();
        var name = enumerable.Where(x => x.Type == ClaimTypes.Name).Select(x => x.Value).FirstOrDefault();
        var country = enumerable.Where(x => x.Type == ClaimTypes.Country).Select(x => x.Value).FirstOrDefault();
        var phone = enumerable.Where(x => x.Type == ClaimTypes.MobilePhone).Select(x => x.Value).FirstOrDefault();
        var roleClaim = enumerable.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value).FirstOrDefault();

        return _userClaims = new(userId, name, email, country, roleClaim, phone);
    }

    /// <summary>
    /// This method also gets the currently logged user information from the database to provide more information to authorization verifications.
    /// </summary>
    protected Task<ServiceResponse<UserDTO>> GetCurrentUser() => UserService.GetUser(ExtractClaims().Id);
}
