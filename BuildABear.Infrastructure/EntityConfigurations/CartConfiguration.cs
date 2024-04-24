
using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.Property(e => e.Id).IsRequired();
        builder.HasKey(e => e.Id);
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired();
        builder.Property(e => e.UserId).IsRequired();

        //builder.HasOne(c => c.Order)
        //    .WithOne(e => e.Cart)
        //    .HasForeignKey<Order>(e => e.CartId)
        //    .IsRequired(false)
        //    .OnDelete(DeleteBehavior.Cascade);

        //builder.HasOne(c => c.User)
        //    .WithMany(e => e.Carts)
        //    .HasForeignKey(c => c.UserId)
        //    .HasPrincipalKey(e => e.Id);

    }
}
