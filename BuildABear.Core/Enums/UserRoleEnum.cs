using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace BuildABear.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<UserRoleEnum, string>))]
public sealed class UserRoleEnum : SmartEnum<UserRoleEnum, string>
{
    public static readonly UserRoleEnum Admin       = new(nameof(Admin), "Admin");
    public static readonly UserRoleEnum Operator    = new(nameof(Operator), "Operator");
    public static readonly UserRoleEnum Client      = new(nameof(Client), "Client");
    public static readonly UserRoleEnum Viewer      = new(nameof(Viewer), "Viewer");
    public static readonly UserRoleEnum Vendor      = new(nameof(Vendor), "Enterprise Vendor");

    private UserRoleEnum(string name, string value) : base(name, value)
    {
    }
}
