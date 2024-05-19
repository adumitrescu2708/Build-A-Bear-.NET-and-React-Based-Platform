using BuildABear.Core.Enums;

namespace BuildABear.Core.DataTransferObjects;

public class FeedbackDTO
{
    public string Comments { get; set; } = default!; // text box
    public FeedbackGrade FeedbackGrade { get; set; } = default!; // radio
    public FeedbackServiceAction FeedbackServiceAction { get; set; } = default!; // select
    public bool Contact { get; set; } = default!;

}
