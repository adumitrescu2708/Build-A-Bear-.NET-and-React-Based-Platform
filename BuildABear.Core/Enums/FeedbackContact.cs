using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;
namespace BuildABear.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<FeedbackContact, string>))]
public class FeedbackContact : SmartEnum<FeedbackContact, string>
{
    public static readonly FeedbackContact PhoneCall = new(nameof(PhoneCall), "Phone Call");
    public static readonly FeedbackContact Email = new(nameof(Email), "Email notification");
    public static readonly FeedbackContact PhoneMessage = new(nameof(PhoneMessage), "Phone message");
    private FeedbackContact(string name, string value) : base(name, value) { }
}

