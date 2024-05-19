
using BuildABear.Core.Entities;
using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;
using BuildABear.Infrastructure.Database;
using BuildABear.Infrastructure.Repositories.Interfaces;
using BuildABear.Infrastructure.Services.Interfaces;
namespace BuildABear.Infrastructure.Services.Implementations;

public class FeedbackService : IFeedbackService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public FeedbackService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse> Add(FeedbackDTO feedback, CancellationToken cancellationToken = default) {
        await _repository.AddAsync(new Feedback { 
            Comments = feedback.Comments,
            Contact = feedback.Contact,
            FeedbackServiceAction = feedback.FeedbackServiceAction,
            FeedbackGrade = feedback.FeedbackGrade,
        }, cancellationToken);
        return ServiceResponse.ForSuccess();
    }
}
