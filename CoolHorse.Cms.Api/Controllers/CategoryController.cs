namespace CoolHorse.Cms.Api.Controllers
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;
    using System.Web.Http;


    public class CategoryController : ApiController
    {
        public IEnumerable<CategoryModel> Get()
        {
            var result = new List<CategoryModel>();

            var category = new CategoryModel();
            category.Description = "Description";
            category.Title = "Title";
            category.Id = 1;

            result.Add(category);

            return result;
        }
    }
}
