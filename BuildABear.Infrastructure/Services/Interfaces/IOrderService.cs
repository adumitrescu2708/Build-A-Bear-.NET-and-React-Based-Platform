
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Enums;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface IOrderService
{
    public Task<ServiceResponse> PlaceOrder(OrderAddDTO order, UserDTO requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<OrderViewDTO>> GetOrder(Guid id, UserDTO requestingUser, CancellationToken cancellationToken = default);
    //public Task<ServiceResponse<PagedResponse<OrderViewDTO>>> GetOrdersUser(Guid id, UserDTO requestingUser, PaginationQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateOrder(Guid id, OrderStatus status, UserDTO requestingUser, CancellationToken cancellationToken = default);
}
