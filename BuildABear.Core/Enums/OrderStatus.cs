
using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;
namespace BuildABear.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<OrderStatus, string>))]
public class OrderStatus : SmartEnum<OrderStatus, string>
{
    public static readonly OrderStatus Pending = new(nameof(Pending), "Pending");
    public static readonly OrderStatus Canceled = new(nameof(Canceled), "Canceled");
    public static readonly OrderStatus Shipped = new(nameof(Shipped), "Shipped");
    public static readonly OrderStatus Delivered = new(nameof(Delivered), "Delivered");
    public static readonly OrderStatus Returned = new(nameof(Returned), "Returned");
    public static readonly OrderStatus Processing = new(nameof(Processing), "Processing");
    private OrderStatus(string name, string value) : base(name, value) { }
}
