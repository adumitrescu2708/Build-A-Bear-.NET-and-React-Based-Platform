using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        /* one-to-many relationship between user and orders */
        builder.HasOne(e => e.User)
            .WithMany(e => e.Orders)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id);
    }
}
