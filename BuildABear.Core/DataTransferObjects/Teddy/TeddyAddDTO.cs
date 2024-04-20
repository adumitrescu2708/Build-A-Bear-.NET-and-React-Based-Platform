using BuildABear.Core.Entities;
using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class TeddyBuildDTO
{
    public string Name { get; set; } = default!;
    public TeddyFillingEnum Filling { get; set; } = default!;
    public Guid TeddyTemplateId { get; set; } = default!;
    public ICollection<Guid>? ItemsIds { get; set; }
}
