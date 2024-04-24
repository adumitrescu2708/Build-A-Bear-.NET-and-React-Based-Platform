
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.DataTransferObjects.TeddyTemplate;
using BuildABear.Core.Requests;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface ITeddyTemplateService
{
    public Task<ServiceResponse<int>> GetTeddyTemplatesCount(CancellationToken cancellationToken);
    public Task<ServiceResponse> AddTeddyTemplate(TeddyTemplateDTO template, UserDTO? requestingUser = default, CancellationToken ?cancellationToken = default);
    public Task<ServiceResponse<Guid>> AddTeddyTemplate(TeddyTemplateAddDTO template, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> RemoveTeddyTemplate(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<FileDTO>> GetTemplateById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<TeddyTemplateViewDTO>>> GetAll(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
}
