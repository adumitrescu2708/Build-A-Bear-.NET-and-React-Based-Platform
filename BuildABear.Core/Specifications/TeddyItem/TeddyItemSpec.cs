using BuildABear.Core.Entities;
using Ardalis.Specification;
using BuildABear.Core.Enums;
namespace BuildABear.Core.Specifications;

public class TeddyItemSpec : BaseSpec<TeddyItemSpec, TeddyItem>
{
    public TeddyItemSpec(string SKU)
    {
        Query.Where(e => e.SKU == SKU);
    }
    public TeddyItemSpec(Guid id)
    {
        Query.Where(e => e.Id == id);
    }
    public TeddyItemSpec(Teddy teddy)
    {
        Query.Where(e => e.Teddys.Contains(teddy));
    }

    public TeddyItemSpec(TeddyItemCategoryEnum category)
    {
        Query.Where(e => e.ItemCategory == category);
    }

}
