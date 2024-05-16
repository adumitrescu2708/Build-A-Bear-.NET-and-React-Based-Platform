
using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;
namespace BuildABear.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<FeedbackGrade, string>))]
public class FeedbackGrade : SmartEnum<FeedbackGrade, string>
{
    public static readonly FeedbackGrade Poor = new(nameof(Poor), "Poor");
    public static readonly FeedbackGrade Average = new(nameof(Average), "Average");
    public static readonly FeedbackGrade Good = new(nameof(Good), "Good");
    public static readonly FeedbackGrade Excellent = new(nameof(Excellent), "Excellent");
    public static readonly FeedbackGrade VeryPoor = new(nameof(VeryPoor), "Very Poor");

    private FeedbackGrade(string name, string value) : base(name, value) { }
}

