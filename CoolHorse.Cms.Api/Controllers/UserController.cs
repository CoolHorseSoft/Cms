namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;

    public class UserController : ApiController
    {
        private readonly User _user = null;

        public UserController()
        {
            _user = new User();
        }

        [HttpGet]
        public IEnumerable<UserModel> GetAll()
        {
            return _user.GetAll();
        }

        [HttpGet]
        public UserModel GetById(int id)
        {
            return _user.GetByKey(id);
        }

        [HttpPost]
        public UserModel Update([FromBody]UserModel model)
        {
            return _user.Update(model);
        }

        [HttpPost]
        public UserModel Create([FromBody]UserModel model)
        {
            return _user.Create(model);
        }

        [HttpPost]
        public bool Delete([FromBody]int id)
        {
            return _user.Delete(id);
        }
    }
}
