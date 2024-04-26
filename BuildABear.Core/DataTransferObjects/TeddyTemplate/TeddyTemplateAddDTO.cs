using Microsoft.AspNetCore.Http;

namespace BuildABear.Core.DataTransferObjects.TeddyTemplate;

public class TeddyTemplateAddDTO
{
    public IFormFile File { get; set; } = default!;

    public string TeddyName { get; set; } = default!;

    public string Filename { get; set; } = default!;
}
