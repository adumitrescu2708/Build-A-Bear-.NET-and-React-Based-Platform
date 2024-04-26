
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface ITeddyService
{
    public Task<ServiceResponse<Guid>> AddTeddy(TeddyBuildDTO tedy, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<Guid>> UpdateTeddy(Guid id, TeddyUpdateDTO teddyTemp, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteTeddy(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<TeddyBuildDTO>> GetTeddy(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
}
