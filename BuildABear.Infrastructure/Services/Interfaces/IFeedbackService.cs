

using BuildABear.Core.DataTransferObjects;
using BuildABear.Core.Responses;

namespace BuildABear.Infrastructure.Services.Interfaces;

public interface IFeedbackService
{
    public Task<ServiceResponse> Add(FeedbackDTO feedback, CancellationToken cancellationToken = default);
}
