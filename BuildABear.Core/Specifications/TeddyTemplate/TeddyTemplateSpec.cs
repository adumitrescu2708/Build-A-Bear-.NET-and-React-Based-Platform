using Ardalis.Specification;
using BuildABear.Core.Entities;
namespace BuildABear.Core.Specifications;

public class TeddyTemplateSpec : BaseSpec<TeddyTemplateSpec, TeddyTemplate>
{
    public TeddyTemplateSpec(string name) {
        Query.Where(e => e.TeddyName == name);
    }
}
