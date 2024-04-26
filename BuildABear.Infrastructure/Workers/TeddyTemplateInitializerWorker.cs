
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using BuildABear.Infrastructure.Services.Interfaces;
using BuildABear.Core.DataTransferObjects;


namespace BuildABear.Infrastructure.Workers;

public class TeddyTemplateInitializerWorker : BackgroundService
{
    private readonly ILogger<TeddyTemplateInitializerWorker> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly string _templateFolderPath = "../BuildABear.Templates/Bear";

    public TeddyTemplateInitializerWorker(ILogger<TeddyTemplateInitializerWorker> logger,  IServiceProvider serviceProvider) {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try {
            await using var scope = _serviceProvider.CreateAsyncScope();
            var teddyService = scope.ServiceProvider.GetService<ITeddyTemplateService>();
            if (teddyService == null)
            {
                _logger.LogInformation("Couldn't create the teddy service!");

                return;
            }

            var count = await teddyService.GetTeddyTemplatesCount(stoppingToken);
            if (count.Result == 0)
            {
                string[] templateFiles = (string[])Directory.GetFiles(_templateFolderPath, "*.jpg").Concat(Directory.GetFiles(_templateFolderPath, "*.jpeg")).ToArray();

                string[] teddyNames = { "Teddy", "Fluffy", "Snuggles", "Cuddles", "Honey", "Paws", "Button", "Coco" };
                int teddyIdx = 0;
                foreach(var file in templateFiles) {
                    FileInfo fileInfo = new FileInfo(file);
                    byte []fileContent = new byte[fileInfo.Length];
                    fileInfo.OpenRead().Read(fileContent, 0, (int) fileInfo.Length);

                    await teddyService.AddTeddyTemplate(new TeddyTemplateDTO()
                    {
                        File = fileContent,
                        FileName = file,
                        TeddyTemplateName = teddyNames[teddyIdx]
                    }, cancellationToken:stoppingToken);
                    teddyIdx ++;
                }
            }


        } catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initializing database!");
        }
    }
}
