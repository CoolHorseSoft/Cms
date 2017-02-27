using System.Net.Http.Formatting;
using System.Web.Http;

namespace CoolHorse.Cms.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var jsonFormatter = new JsonMediaTypeFormatter();
            config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));

            
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
