
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BuildABear.Core.Enums;

public class TeddyItemCategoryEnumConverter : JsonConverter<TeddyItemCategoryEnum>
{
    public override TeddyItemCategoryEnum Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string value = reader.GetString();

        // Custom logic for deserialization
        switch (value)
        {
            case "Shoes": return TeddyItemCategoryEnum.Shoes;
            case "Costume": return TeddyItemCategoryEnum.Costume;
            case "Hoodie": return TeddyItemCategoryEnum.Hoodie;
            case "Dress": return TeddyItemCategoryEnum.Dress;
            case "TShirt": return TeddyItemCategoryEnum.TShirt;
            case "Pants": return TeddyItemCategoryEnum.Pants;
            case "Pyjamas": return TeddyItemCategoryEnum.Pyjamas;
            default: throw new JsonException("Unknown category");
        }
    }

    public override void Write(Utf8JsonWriter writer, TeddyItemCategoryEnum value, JsonSerializerOptions options)
    {
        // Custom logic for serialization
        string stringValue = value switch
        {
            TeddyItemCategoryEnum.Shoes => "Shoes",
            TeddyItemCategoryEnum.Costume => "Costume",
            TeddyItemCategoryEnum.Hoodie => "Hoodie",
            TeddyItemCategoryEnum.Dress => "Dress",
            TeddyItemCategoryEnum.TShirt => "TShirt",
            TeddyItemCategoryEnum.Pants => "Pants",
            TeddyItemCategoryEnum.Pyjamas => "Pyjamas",
            _ => throw new JsonException("Unknown category")
        };

        writer.WriteStringValue(stringValue);
    }
}
