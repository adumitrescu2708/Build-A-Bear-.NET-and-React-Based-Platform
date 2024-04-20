using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BuildABear.Core.Enums;
[JsonConverter(typeof(SmartEnumNameConverter<VendorContractRenewalTerms, string>))]
public class VendorContractRenewalTerms : SmartEnum<VendorContractRenewalTerms, string>
{
    public static readonly VendorContractRenewalTerms Annual = new(nameof(Annual), "Annual");
    public static readonly VendorContractRenewalTerms Biennial = new(nameof(Biennial), "Biennial");
    public static readonly VendorContractRenewalTerms OnDemand = new(nameof(OnDemand), "On Demand");
    public static readonly VendorContractRenewalTerms AutoRenew = new(nameof(AutoRenew), "Automatic renew");
    public static readonly VendorContractRenewalTerms Monthly = new(nameof(Monthly), "Monthly");


    private VendorContractRenewalTerms(string name, string value) : base(name, value)
    {
    }
}
