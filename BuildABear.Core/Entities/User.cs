using BuildABear.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace BuildABear.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class User : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string Country { get; set; } = default!;
    public string City { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;

    ///* one-to-one relationship between an user and a cart */
    public Cart Cart { get; set; } = default!;

    //public Guid MainCartId { get; set; } = default!;
    //public Cart MainCart { get; set; } = default!;
    //public ICollection<Cart> Carts { get; set; } = default!;

    public Guid? VendorId { get; set; } = default;
    public Vendor? Vendor { get; set; } = default;
    public ICollection<UserFile> UserFiles { get; set; } = default!;
    public ICollection<Order> Orders { get; set; } = default!;

}
