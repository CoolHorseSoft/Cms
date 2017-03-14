namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class RoleGroupController : ApiController
    {
        private readonly RoleGroup _roleGroup = null;

        public RoleGroupController()
        {
            _roleGroup = new RoleGroup();
        }

        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse {Response =_roleGroup.GetAll()};
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
            return new ServiceResponse {Response =_roleGroup.GetByKey(id)};
        }

        [HttpPost]
        public ServiceResponse Update([FromBody]RoleGroupModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _roleGroup.Update(model) };
            }
            return new ServiceResponse { ErrorMessage = "该权限组已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]RoleGroupModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _roleGroup.Create(model) };
            }
            return new ServiceResponse { ErrorMessage = "该权限组已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _roleGroup.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该权限组暂时无法删除" };
        }
    }
}
