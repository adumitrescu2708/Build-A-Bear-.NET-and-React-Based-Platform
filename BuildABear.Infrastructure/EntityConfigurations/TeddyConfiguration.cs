using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace BuildABear.Infrastructure.EntityConfigurations;

public class TeddyConfiguration : IEntityTypeConfiguration<Teddy>
{
    void IEntityTypeConfiguration<Teddy>.Configure(EntityTypeBuilder<Teddy> builder)
    {
        builder.HasMany(t => t.Items).WithMany(x => x.Teddys).UsingEntity(j => j.ToTable("TeddyItems")); /* many-to-many relationship teddy-items */

        builder.HasOne(e => e.TeddyTemplate)        /* one-to-many relationship teddy template - teddies */
            .WithMany(x => x.UserTeddys)
            .HasForeignKey(e => e.TeddyTemplateId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(e => e.Id).IsRequired();   /* Id is primary key*/
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name).IsRequired(); /* Required fields */
        builder.Property(e => e.Filling).IsRequired();

        /* one-to-many relationship cart teddys */
        builder.HasOne(e => e.Cart)
            .WithMany(b => b.Products)
            .HasForeignKey(e => e.CartId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Restrict);

        /* one-to-many relationship cart teddys */
        builder.HasOne(e => e.Order)
            .WithMany(b => b.Products)
            .HasForeignKey(e => e.OrderId)
            .HasPrincipalKey(e => e.Id).OnDelete(DeleteBehavior.Cascade);
    }
}
