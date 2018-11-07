using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using aspnetcore_site.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace aspnetcore_site
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            
            // migrate & seed the database.  Best practice = in Main, using service scope
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    var context = scope.ServiceProvider.GetService<MyDbContext>();
                    context.Database.Migrate();
                    if(context.Documents.Count()==0)
                    {
                        context.Documents.Add(new Document
                        {
                            Id = Guid.NewGuid(),
                            Title = "doc 1"
                        });
                        context.Documents.Add(new Document
                        {
                            Id = Guid.NewGuid(),
                            Title = "doc 2"
                        });
                        context.Documents.Add(new Document
                        {
                            Id = Guid.NewGuid(),
                            Title = "doc 3"
                        });
                        context.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating or seeding the database.");
                }
            }


            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
