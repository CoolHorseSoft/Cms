namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class NewsController : ApiController
    {
        private readonly News _news = null;

        public NewsController()
        {
            _news = new News();
        }

        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse { Response = _news.GetAll() };
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
            return new ServiceResponse { Response = _news.GetByKey(id) };
        }

        [HttpPost]
        public ServiceResponse Update([FromBody]NewsModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _news.Update(model) };
            }

            return new ServiceResponse { ErrorMessage = "该新闻已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]NewsModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _news.Create(model) };
            }

            return new ServiceResponse { ErrorMessage = "该新闻已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _news.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该新闻无法删除" };
        }
    }
}
