using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BuildABear.Core.Entities;

namespace BuildABear.Infrastructure.EntityConfigurations;

public class VendorConfiguration : IEntityTypeConfiguration<Vendor>
{
    public void Configure(EntityTypeBuilder<Vendor> builder)
    {
        builder.Property(e => e.Id).IsRequired();
        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => e.Email);

        builder.Property(e => e.Name).IsRequired();
        builder.Property(e => e.Email).IsRequired();
        builder.Property(e => e.PhoneNumber).IsRequired();
        builder.Property(e => e.Address).IsRequired();
        builder.Property(e => e.ContractStartDate).IsRequired();
        builder.Property(e => e.ContractEndDate).IsRequired();
        builder.Property(e => e.PaymentMethod).IsRequired();
        builder.Property(e => e.ContractRenewalTerms).IsRequired();
    }
}
