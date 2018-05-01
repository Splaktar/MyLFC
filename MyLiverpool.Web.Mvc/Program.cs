﻿using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace MyLiverpool.Web.Mvc
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("hosting.json", true)
                .Build();

            var host = WebHost.CreateDefaultBuilder(args)
                //                .UseApplicationInsights()
                .UseConfiguration(config)
                //.CaptureStartupErrors(true)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
#if DEBUG        
                    .UseIISIntegration()
#endif
                    .UseStartup<Startup>()
                    .Build();

            host.Run();
        }
    }
}
