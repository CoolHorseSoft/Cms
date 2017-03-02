[assembly: WebActivator.PreApplicationStartMethod(typeof(CoolHorse.Cms.Api.App_Start.SwaggerNet), "PreStart")]
[assembly: WebActivator.PostApplicationStartMethod(typeof(CoolHorse.Cms.Api.App_Start.SwaggerNet), "PostStart")]
namespace CoolHorse.Cms.Api.App_Start
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Description;
    using System.Web.Routing;
    using Swagger.Net;

    public static class SwaggerNet
    {
        public static void PreStart()
        {
            RouteTable.Routes.MapHttpRoute(
                name: "SwaggerApi",
                routeTemplate: "api/docs/{controller}",
                defaults: new { swagger = true }
            );
        }

        public static void PostStart()
        {
            var config = GlobalConfiguration.Configuration;

            config.Filters.Add(new SwaggerActionFilter());

            try
            {
                config.Services.Replace(typeof(IDocumentationProvider),
                    new XmlCommentDocumentationProvider(HttpContext.Current.Server.MapPath("~/bin/CoolHorse.Cms.Api.XML")));
            }
            catch (FileNotFoundException)
            {
                throw new Exception("Please enable \"XML documentation file\" in project properties with default (bin\\CoolHorse.Cms.Api.XML) value or edit value in App_Start\\SwaggerNet.cs");
            }
        }
    }
}