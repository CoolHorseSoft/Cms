using System;

namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class UserController : ApiController
    {
        private readonly User _user = null;

        public UserController()
        {
            _user = new User();
        }

        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse {Response =_user.GetAll()};
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
            return new ServiceResponse {Response =_user.GetByKey(id)};
        }

        [HttpPost]
        public ServiceResponse Authenticate([FromBody]UserModel model)
        {
            return new ServiceResponse { Response = Guid.NewGuid().ToString() };
        }

        [HttpPost]
        public ServiceResponse Update([FromBody]UserModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _user.Update(model) };
            }
            return new ServiceResponse { ErrorMessage = "该用户已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]UserModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _user.Create(model) };
            }
            return new ServiceResponse { ErrorMessage = "该用户已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _user.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该用户暂时无法删除" };
        }
    }
}
