namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class CategoryController : ApiController
    {
        private readonly Category _category = null;

        public CategoryController()
        {
            _category = new Category();
        }

        /// <summary>
        /// Get all category
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse {Response = _category.GetAll()};
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
             return new ServiceResponse {Response = _category.GetByKey(id)};
        }

        [HttpPost]
        public ServiceResponse Update([FromBody]CategoryModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse {Response =  _category.Update(model)};
            }

            return new ServiceResponse { ErrorMessage = "该类别已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]CategoryModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse {Response =  _category.Create(model)};
            }

            return new ServiceResponse { ErrorMessage = "该类别已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _category.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该类别正在使用中，暂时无法删除" };
        }
    }
}
