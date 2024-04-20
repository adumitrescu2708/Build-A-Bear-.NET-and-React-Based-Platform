using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.DataTransferObjects.TeddyTemplate;
using BuildABear.Core.Entities;
using BuildABear.Core.Errors;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.Specifications;
using System.Net;
using BuildABear.Core.Requests;

namespace BuildABear.Infrastructure.Services.Implementations;

public class TeddyTemplateService : ITeddyTemplateService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IFileRepository _fileRepository;
    public TeddyTemplateService(IRepository<WebAppDatabaseContext> repository, IFileRepository fileRepository)
    {
        _repository = repository;
        _fileRepository = fileRepository;
    }

    public async Task<ServiceResponse<int>> GetTeddyTemplatesCount(CancellationToken cancellationToken) {
        return ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<TeddyTemplate>(cancellationToken));
    }

    public async Task<ServiceResponse> AddTeddyTemplate(TeddyTemplateDTO template, UserDTO? requestingUser, CancellationToken? cancellationToken) {
        if (requestingUser != null && requestingUser.Role != Core.Enums.UserRoleEnum.Admin) {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var fileName = _fileRepository.SaveFile(template.File, Path.Join("templates", IUserFileService.UserFilesDirectory), ".jpg");

        if (fileName.Result == null)
        {
            return fileName.ToResponse();
        }
        
        await _repository.AddAsync(new TeddyTemplate { 
            Path = fileName.Result,
            Filename = template.FileName,
            TeddyName = template.TeddyTemplateName,
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<FileDTO>> GetTemplateById(Guid id, CancellationToken cancellationToken = default)
    {
        var teddyFile = await _repository.GetAsync<TeddyTemplate>(id, cancellationToken);
        if(teddyFile == null) {
            return ServiceResponse<FileDTO>.FromError(new(HttpStatusCode.NotFound, "File entry not found!", ErrorCodes.EntityNotFound));
        }

        var res = _fileRepository.GetFile(Path.Join(Path.Join("templates", IUserFileService.UserFilesDirectory), teddyFile.Path), teddyFile.Filename).Result;

        return ServiceResponse<FileDTO>.ForSuccess(res);
    }

    public async Task<ServiceResponse> AddTeddyTemplate(TeddyTemplateAddDTO template, UserDTO? requestingUser = default, CancellationToken? cancellationToken = default)
    {
        if (requestingUser == null) {
            return ServiceResponse<FileDTO>.FromError(new(HttpStatusCode.NotFound, "Requesting user not found!", ErrorCodes.UserNotFound));
        }

        if(requestingUser != null && requestingUser.Role != Core.Enums.UserRoleEnum.Admin)
        {
            return ServiceResponse<FileDTO>.FromError(new(HttpStatusCode.Forbidden, "Only admin users can add teddy templates!", ErrorCodes.CannotAddTeddyTemplate));
        }

        var fileName = _fileRepository.SaveFile(template.File, Path.Join("templates", IUserFileService.UserFilesDirectory));

        if (fileName.Result == null)
        {
            return fileName.ToResponse();
        }

        await _repository.AddAsync(new TeddyTemplate
        {
            Path = fileName.Result,
            Filename = template.Filename,
            TeddyName = template.TeddyName,
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> RemoveTeddyTemplate(Guid id, UserDTO? requestingUser = default, CancellationToken? cancellationToken = default) {
        if (requestingUser != null && requestingUser.Role != Core.Enums.UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admin users can remove teddy templates!", ErrorCodes.CannotRemoveTeddyTemplate));
        }

        var teddyTemplate = _repository.GetAsync<TeddyTemplate>(id);

        if (teddyTemplate == null) {
            return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Teddy template not found!", ErrorCodes.TeddyTemplateNotFound));
        }

        await _repository.DeleteAsync<TeddyTemplate>(id);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<Guid>>> GetAll(PaginationQueryParams pagination, CancellationToken cancellationToken = default)
    {

        var result = await _repository.PageAsync(pagination, new TeddyTemplateProjectionSpec(), cancellationToken);
        return ServiceResponse<PagedResponse<Guid>>.ForSuccess(result);
    }
}
