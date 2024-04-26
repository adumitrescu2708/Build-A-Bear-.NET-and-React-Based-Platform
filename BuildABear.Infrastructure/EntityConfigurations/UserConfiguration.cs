
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BuildABear.Core.Entities;

namespace BuildABear.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specifies that the property Id is the primary key.
        
        builder.Property(e => e.Name).HasMaxLength(255).IsRequired(); // This specifies the maximum length for varchar type in the database.
        builder.Property(e => e.Email).HasMaxLength(255).IsRequired();
        builder.HasAlternateKey(e => e.Email); // Here it is specifies that the property Email is a unique key.
        builder.Property(e => e.Password).HasMaxLength(255).IsRequired();
        builder.Property(e => e.Role).HasMaxLength(255).IsRequired();
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired();
        builder.Property(e => e.City).IsRequired();
        builder.Property(e => e.Country).IsRequired();
        builder.Property(e => e.PhoneNumber).IsRequired();
        //builder.Property(e => e.MainCartId).IsRequired();

        /* one to many relationship between vendor and users */
        builder.HasOne(e => e.Vendor)
            .WithMany(e => e.Vendors)
            .HasForeignKey(e => e.VendorId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Cart)
            .WithOne(e => e.User)
            .HasForeignKey<Cart>(e => e.UserId).OnDelete(DeleteBehavior.Cascade);

    }
}
