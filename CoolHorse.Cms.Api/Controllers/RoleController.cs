namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class RoleController : ApiController
    {
        private readonly Role _role = null;

        public RoleController()
        {
            _role = new Role();
        }

        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse {Response =_role.GetAll()};
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
            return new ServiceResponse {Response =_role.GetByKey(id)};
        }

        [HttpPost]
        public ServiceResponse Update([FromBody]RoleModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _role.Update(model) };
            }
            return new ServiceResponse { ErrorMessage = "该权限已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]RoleModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _role.Create(model) };
            }
            return new ServiceResponse { ErrorMessage = "该权限已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _role.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该权限暂时无法删除" };
        }
    }
}
