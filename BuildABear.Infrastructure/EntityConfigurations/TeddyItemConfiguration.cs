using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class TeddyItemConfiguration : IEntityTypeConfiguration<TeddyItem>
{
    public void Configure(EntityTypeBuilder<TeddyItem> builder)
    {
        builder.Property(e => e.Id).IsRequired();   // id is Primary key
        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(e => e.SKU);        // SKU is secondary key

        builder.Property(e => e.Quantity).IsRequired();
        builder.Property(e => e.Price).IsRequired();
        builder.Property(e => e.Color).IsRequired();
        builder.Property(e => e.Fabric).IsRequired();
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired();
        builder.Property(e => e.Path).IsRequired();
        builder.Property(e => e.Name).HasMaxLength(255).IsRequired();
        builder.Property(e => e.Valability).IsRequired();
        builder.Property(e => e.ItemCategory).IsRequired();
        builder.Property(e => e.FileName).IsRequired();

        /* one-to-many relationship between vendors and teddies */
        builder.HasOne(e => e.Vendor)
        .WithMany(e => e.TeddyItems)
        .HasForeignKey(e => e.VendorId)
        .HasPrincipalKey(e => e.Id);
    }
}
