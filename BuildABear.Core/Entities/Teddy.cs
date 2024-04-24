using BuildABear.Core.Enums;
namespace BuildABear.Core.Entities;

public class Teddy : BaseEntity
{
    public string Name { get; set; } = default!;
    public TeddyFillingEnum Filling { get; set; } = default!;

    /* one-to-many relationship between a teddy and its teddy template */
    public Guid TeddyTemplateId { get; set; } = default!;
    public TeddyTemplate TeddyTemplate { get; set; } = default!;
    /* many-to-many relationship between teddys and teddy items*/
    public ICollection<TeddyItem>? Items { get; set; }

    /* one-to-many relationship between teddies and cart */
    public Guid? CartId { get; set; } = default!;
    public Cart? Cart { get; set; } = default!;

    public Guid? OrderId { get; set; } = default!;
    public Order? Order { get; set; } = default!;
}
