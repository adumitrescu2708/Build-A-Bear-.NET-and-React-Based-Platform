using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;
namespace BuildABear.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<FeedbackServiceAction, string>))]
public class FeedbackServiceAction : SmartEnum<FeedbackServiceAction, string>
{
    public static readonly FeedbackServiceAction BuyTeddy = new(nameof(BuyTeddy), "Buy Teddy");
    public static readonly FeedbackServiceAction ReturnTeddy = new(nameof(ReturnTeddy), "Return Teddy");
    public static readonly FeedbackServiceAction ShippingTeddy = new(nameof(ShippingTeddy), "Shipping Teddy");
    public static readonly FeedbackServiceAction Cashback = new(nameof(Cashback), "Cashback");
    private FeedbackServiceAction(string name, string value) : base(name, value) { }
}

