namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;

    public class NewsController : ApiController
    {
        private readonly News _news = null;

        public NewsController()
        {
            _news = new News();
        }

        [HttpGet]
        public IEnumerable<NewsModel> GetAll()
        {
            return _news.GetAll();
        }

        [HttpGet]
        public NewsModel GetById(int id)
        {
            return _news.GetByKey(id);
        }

        [HttpPost]
        public NewsModel Update([FromBody]NewsModel model)
        {
            return _news.Update(model);
        }

        [HttpPost]
        public NewsModel Create([FromBody]NewsModel model)
        {
            return _news.Create(model);
        }

        [HttpPost]
        public bool Delete([FromBody]int id)
        {
            return _news.Delete(id);
        }
    }
}
