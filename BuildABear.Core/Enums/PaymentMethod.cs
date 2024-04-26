using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace BuildABear.Core.Enums;
[JsonConverter(typeof(SmartEnumNameConverter<PaymentMethod, string>))]
public class PaymentMethod : SmartEnum<PaymentMethod, string>
{
    public static readonly PaymentMethod CreditCard = new(nameof(CreditCard), "CreditCard");
    public static readonly PaymentMethod BankTransfer = new(nameof(BankTransfer), "BankTransfer");
    public static readonly PaymentMethod PayPal = new(nameof(PayPal), "Pay Pal");
    public static readonly PaymentMethod Cheque = new(nameof(Cheque), "Cheque");
    public static readonly PaymentMethod Cash = new(nameof(Cash), "Cash");
    private PaymentMethod(string name, string value) : base(name, value)
    {
    }
}

