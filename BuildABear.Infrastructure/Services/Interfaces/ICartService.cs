using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface ICartService
{
    public Task<ServiceResponse<PagedResponse<TeddyBuildDTO>>> Get(PaginationQueryParams pagination, Guid id, bool isUserId, UserDTO requestingUser, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<int>> GetPrice(UserDTO requestingUser, Guid? id = default, bool? isUserId = default, CancellationToken cancellationToken = default);
}
