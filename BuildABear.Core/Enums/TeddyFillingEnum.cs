using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace BuildABear.Core.Enums;
[JsonConverter(typeof(SmartEnumNameConverter<TeddyFillingEnum, string>))]
public sealed class TeddyFillingEnum : SmartEnum<TeddyFillingEnum, string>
{
    public static readonly TeddyFillingEnum Polyester = new(nameof(Polyester), "Polyester");
    public static readonly TeddyFillingEnum Wool = new(nameof(Wool), "Wool");
    public static readonly TeddyFillingEnum Cotton = new(nameof(Cotton), "Cotton");
    public static readonly TeddyFillingEnum Foam = new(nameof(Foam), "Foam");
    public static readonly TeddyFillingEnum Microbeans = new(nameof(Microbeans), "Microbeans");
    public static readonly TeddyFillingEnum Empty = new(nameof(Empty), "Empty");

    private TeddyFillingEnum(string name, string value) : base(name, value)
    {
    }
}
