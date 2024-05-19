using BuildABear.Core.Entities;
using BuildABear.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.Property(e => e.Id).IsRequired();
        builder.HasKey(e => e.Id);
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired();
        builder.Property(e => e.Comments).IsRequired();
        builder.Property(e => e.FeedbackGrade).IsRequired();
        builder.Property(e => e.FeedbackServiceAction).IsRequired();
        builder.Property(e => e.Contact).IsRequired();
    }
}
