
namespace BuildABear.Core.Requests;

public class VendorSearchQueryParams : PaginationQueryParams
{
    public Guid id { get; set; } = default;
}
