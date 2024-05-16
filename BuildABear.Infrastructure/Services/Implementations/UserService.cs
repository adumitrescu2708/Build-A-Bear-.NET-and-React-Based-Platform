using System.Net;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Constants;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Entities;
using BuildABear.Core.Enums;
using BuildABear.Core.Errors;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;
using BuildABear.Core.Specifications;
using BuildABear.Core.Helpers;

namespace BuildABear.Infrastructure.Services.Implementations;

public class UserService : IUserService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly ILoginService _loginService;
    private readonly IMailService _mailService;
    private readonly IVendorService _vendorService;

    /// <summary>
    /// Inject the required services through the constructor.
    /// </summary>
    public UserService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService, IMailService mailService, IVendorService vendorService)
    {
        _repository = repository;
        _loginService = loginService;
        _mailService = mailService;
        _vendorService = vendorService;
    }

    public async Task<ServiceResponse<UserDTO>> GetUser(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<UserDTO>.ForSuccess(result) :
            ServiceResponse<UserDTO>.FromError((new(HttpStatusCode.NotFound, "Specified user not found!", ErrorCodes.UserNotFound))); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<UserDTO>>> GetUsers(UserDTO? requestingUser,PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        if(requestingUser == null) {
            return ServiceResponse<PagedResponse<UserDTO>>.FromError(new(HttpStatusCode.NotFound, "Requesting user not found!", ErrorCodes.UserNotFound));
        }
        if(requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse<PagedResponse<UserDTO>>.FromError(new(HttpStatusCode.Forbidden, "Only admin users can view details on multiple users!", ErrorCodes.CannotViewUser));
        }
        var result = await _repository.PageAsync(pagination, new UserProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse<PagedResponse<UserDTO>>.ForSuccess(result);
    }

    /*
        Returns list of order ids
        - only order owner and admins can vire order ids list
        - checks if received user id exists
     */
    public async Task<ServiceResponse<ICollection<Guid>>> GetOrdersIds(UserDTO? requestingUser, Guid? userId = default, CancellationToken cancellationToken = default)
    {
        if(requestingUser == null)
        {
            return ServiceResponse<ICollection<Guid>>.FromError(new(HttpStatusCode.NotFound, "Requesting user doesn't exist!", ErrorCodes.UserNotFound));
        }
        if((requestingUser != null && !(requestingUser.Role == UserRoleEnum.Admin || requestingUser.Id == userId)))
        {
            return ServiceResponse<ICollection<Guid>>.FromError(new(HttpStatusCode.Forbidden, "Only the admin and orders owner can view order!", ErrorCodes.CannotViewOrder));
        }

        var user = await _repository.GetAsync<User>((Guid)userId);
        if(user == null)
        {
            return ServiceResponse<ICollection<Guid>>.FromError(new(HttpStatusCode.NotFound, "User not found!", ErrorCodes.UserNotFound));
        }

        List<Order> orders = await _repository.ListAsync(new OrderSpec(requestingUser.Id, true), cancellationToken);
        List<Guid> ordersIds = orders.Select(x => x.Id).ToList();
        return ServiceResponse<ICollection<Guid>>.ForSuccess(ordersIds);
        
    }

    public async Task<ServiceResponse<LoginResponseDTO>> Login(LoginDTO login, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserSpec(login.Email), cancellationToken);

        if (result == null) // Verify if the user is found in the database.
        {
            return ServiceResponse<LoginResponseDTO>.FromError(CommonErrors.UserNotFound); // Pack the proper error as the response.
        }

        if (result.Password != login.Password) // Verify if the password hash of the request is the same as the one in the database.
        {
            return ServiceResponse<LoginResponseDTO>.FromError(new(HttpStatusCode.BadRequest, "Wrong password!", ErrorCodes.WrongPassword));
        }

        var user = new UserDTO
        {
            Id = result.Id,
            Email = result.Email,
            Name = result.Name,
            Role = result.Role,
            Country = result.Country,
            PhoneNumber = result.PhoneNumber,
        };

        return ServiceResponse<LoginResponseDTO>.ForSuccess(new()
        {
            User = user,
            Token = _loginService.GetToken(user, DateTime.UtcNow, new(7, 0, 0, 0)) // Get a JWT for the user issued now and that expires in 7 days.
        });
    }

    public async Task<ServiceResponse<int>> GetUserCount(CancellationToken cancellationToken = default) =>
        ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<User>(cancellationToken)); // Get the count of all user entities in the database.


    public async Task<ServiceResponse> Register(UserAddDTO login, CancellationToken cancellationToken = default) {
        var result = await _repository.GetAsync(new UserSpec(login.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
        }

        if (login.Role == UserRoleEnum.Vendor)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Enterprise vendors should have a vendor id!", ErrorCodes.CannotAdd));
        }

        var mainCart = new Cart();
        await _repository.AddAsync(new User
        {
            Email = login.Email,
            Name = login.Name,
            Role = login.Role,
            Password = login.Password,
            Country = login.Country,
            City = login.City,
            PhoneNumber = login.PhoneNumber,
            Cart = mainCart
        }, cancellationToken);

        var added_user = await _repository.GetAsync(new UserSpec(login.Email));

        if (added_user == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.InternalServerError, "Cannot get user!", ErrorCodes.CannotGet));
        }

        await _mailService.SendMail(login.Email, "Welcome!", MailTemplates.UserAddTemplate(login.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

        return ServiceResponse.ForSuccess();
    }

    /*
         Each user has a corresponding cart
            - check if the given user id is found (i.e if the user exists)
            - only admins and cart owners can view cart id
     */
    public async Task<ServiceResponse<Guid>> GetCartId(UserDTO? requestingUser, Guid? userId = default, CancellationToken cancellationToken = default) {
        if(!userId.HasValue)
        {
            var user = _repository.GetAsync<User>(requestingUser.Id);
            if (user.Result == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "User not found!", ErrorCodes.UserNotFound));
            }

            var cart = await _repository.GetAsync(new CartSpec(requestingUser.Id), cancellationToken);
            if (cart == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Cart for user not found!", ErrorCodes.CartNotExisting));
            }

            return ServiceResponse<Guid>.ForSuccess(cart.Id);
        } else
        {
            var user = await _repository.GetAsync<User>((Guid) userId, cancellationToken);
            if(user == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "User not found!", ErrorCodes.UserNotFound));
            }
            if(!(requestingUser.Role == UserRoleEnum.Admin || requestingUser.Id == user.Id))
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.Forbidden, "Only admins and cart owner can view cart!", ErrorCodes.CannotViewCart));
            }

            var cart = await _repository.GetAsync(new CartSpec((Guid)userId), cancellationToken);
            if (cart == null)
            {
                return ServiceResponse<Guid>.FromError(new(HttpStatusCode.NotFound, "Cart for user not found!", ErrorCodes.CartNotExisting));
            }

            return ServiceResponse<Guid>.ForSuccess(cart.Id);
        }

    }

    /* Adds users of any role - except of vendors, only admin users can add users, checks if users already exists */
    public async Task<ServiceResponse<BriefUserDTO>> AddUser(UserAddDTO user, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new UserSpec(user.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
        }

        if(user.Role == UserRoleEnum.Vendor)
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Forbidden, "Enterprise vendors should have a vendor id!", ErrorCodes.CannotAdd));
        }

        var mainCart = new Cart();
        await _repository.AddAsync(new User
        {
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Password = user.Password,
            Country = user.Country,
            City = user.City,
            PhoneNumber = user.PhoneNumber,
            Cart = mainCart
        }, cancellationToken);

        var added_user = await _repository.GetAsync(new UserSpec(user.Email));

        if (added_user == null) {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.InternalServerError, "Cannot get user!", ErrorCodes.CannotGet));
        }

        await _mailService.SendMail(user.Email, "Welcome!", MailTemplates.UserAddTemplate(user.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

        return ServiceResponse<BriefUserDTO>.ForSuccess(new() { 
            Name = added_user.Name,
            Email = added_user.Email,
            Id = added_user.Id,
            Role = added_user.Role,
        });
    }

    /* Adds users of role vendors - only admin users can add vendor users, checks if the vendor id exists and if vendor contract is expired */
    public async Task<ServiceResponse<BriefUserDTO>> AddVendorUser(VendorUserAddDTO user, UserDTO? requestingUser, CancellationToken cancellationToken = default) {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        if (user.Role != UserRoleEnum.Vendor)
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Forbidden, "Can only add vendor users!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new UserSpec(user.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
        }

        var searchVendor = await _repository.GetAsync(new VendorSpec((Guid)user.VendorId), cancellationToken);

        if (searchVendor == null)
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.NotFound, "Vendor not existing!", ErrorCodes.VendorNotFound));
        }


        if (!Helpers.isValidDate(DateTime.Now, searchVendor.ContractStartDate, searchVendor.ContractEndDate))
        {
            return ServiceResponse<BriefUserDTO>.FromError(new(HttpStatusCode.Forbidden, "Vendor contract expired!", ErrorCodes.ContractExpired));
        }

        var mainCart = new Cart();

        await _repository.AddAsync(new User
        {
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Password = user.Password,
            Country = user.Country,
            City = user.City,
            PhoneNumber = user.PhoneNumber,
            VendorId = user.VendorId,
            Cart = mainCart
        }, cancellationToken);

        var added_user = await _repository.GetAsync(new UserSpec(user.Email));

        return ServiceResponse<BriefUserDTO>.ForSuccess(new() { 
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Id = added_user.Id
        });
    }


    public async Task<ServiceResponse> UpdateUser(UserUpdateDTO user, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != user.Id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new UserSpec(user.Id), cancellationToken);

        if (entity != null) // Verify if the user is not found, you cannot update an non-existing entity.
        {
            entity.Name = user.Name ?? entity.Name;
            entity.Password = user.Password ?? entity.Password;
            entity.City = user.City ?? entity.City;
            entity.Country = user.Country ?? entity.Country;
            entity.PhoneNumber = user.PhoneNumber ?? entity.PhoneNumber;

            await _repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteUser(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the user!", ErrorCodes.CannotDelete));
        }
        var result = await _repository.GetAsync(new UserProjectionSpec(id), cancellationToken);
        if (result == null) {

            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Specified user not found!!", ErrorCodes.UserNotFound));
        }

        await _repository.DeleteAsync<User>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }
}
