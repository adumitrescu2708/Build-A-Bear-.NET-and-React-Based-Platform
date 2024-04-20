using Ardalis.Specification;
using BuildABear.Core.Entities;
using System.Linq.Expressions;

namespace BuildABear.Core.Specifications;

public class TeddyTemplateProjectionSpec : BaseSpec<TeddyTemplateProjectionSpec, TeddyTemplate, Guid>
{
    protected override Expression<Func<TeddyTemplate, Guid>> Spec => e => e.Id;

    public TeddyTemplateProjectionSpec() : base() { Query.Select(e => e.Id); }
}
