using BuildABear.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class TeddyTemplateConfiguration : IEntityTypeConfiguration<TeddyTemplate>
{
    public void Configure(EntityTypeBuilder<TeddyTemplate> builder)
    {
        builder.Property(e => e.Id).IsRequired();
        builder.HasKey(e => e.Id);

        builder.Property(e => e.TeddyName).IsRequired();
        builder.HasAlternateKey(e => e.TeddyName);

        builder.Property(e => e.Path).IsRequired();
        builder.Property(e => e.Filename).IsRequired();
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired();

        /* one-to-many relationship teddies and teddy template */
        builder.HasMany(a => a.UserTeddys)
            .WithOne(b => b.TeddyTemplate)
            .HasForeignKey(b => b.TeddyTemplateId);
    }
}
