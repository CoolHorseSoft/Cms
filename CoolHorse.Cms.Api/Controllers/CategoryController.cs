namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;

    public class CategoryController : ApiController
    {
        private readonly Category _category = null;

        public CategoryController()
        {
            _category = new Category();
        }

        [HttpGet]
        public IEnumerable<CategoryModel> GetAll()
        {
            return _category.GetAll();
        }

        [HttpGet]
        public CategoryModel GetById(int id)
        {
            return _category.GetByKey(id);
        }

        [HttpPost]
        public CategoryModel Update([FromBody]CategoryModel model)
        {
            return _category.Update(model);
        }

        [HttpPost]
        public CategoryModel Create([FromBody]CategoryModel model)
        {
            return _category.Create(model);
        }

        [HttpPost]
        public bool Delete([FromBody]int id)
        {
            return _category.Delete(id);
        }
    }
}
