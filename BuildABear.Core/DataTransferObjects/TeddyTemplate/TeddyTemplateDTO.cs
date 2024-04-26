
using Microsoft.AspNetCore.Http;

namespace BuildABear.Core.DataTransferObjects;

public class TeddyTemplateDTO
{
    public string TeddyTemplateName { get; set; } = default!;
    public byte[] File { get; set; } = default!;
    public string FileName { get; set; } = default!;
}
