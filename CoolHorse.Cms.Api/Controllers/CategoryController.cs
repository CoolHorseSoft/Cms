using CoolHorse.Cms.BusinessCore;

namespace CoolHorse.Cms.Api.Controllers
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;
    using System.Web.Http;


    public class CategoryController : ApiController
    {
        public IEnumerable<CategoryModel> Get()
        {
            var category = new Category();

            return category.GetAll();
        }
    }
}
