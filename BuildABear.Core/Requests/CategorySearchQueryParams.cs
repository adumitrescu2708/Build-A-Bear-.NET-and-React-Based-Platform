
using BuildABear.Core.Enums;

namespace BuildABear.Core.Requests;

public class CategorySearchQueryParams : PaginationQueryParams
{
    public TeddyItemCategoryEnum category { get; set; } = default;
}
