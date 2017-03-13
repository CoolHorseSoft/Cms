namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;
    using ValidationService;

    public class ProductController : ApiController
    {
        private readonly Product _product = null;

        public ProductController()
        {
            _product = new Product();
        }

        /// <summary>
        /// Get all Product
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse GetAll()
        {
            return new ServiceResponse { Response = _product.GetAll()};
        }

        [HttpGet]
        public ServiceResponse GetById(int id)
        {
            return new ServiceResponse { Response = _product.GetByKey(id)};
        }

        /// <summary>
        /// Update a Product
        /// </summary>
        /// <param name="model"></param>
        /// <see cref="ProductModel"/>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse Update([FromBody]ProductModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _product.Update(model) };
            }

            return new ServiceResponse { ErrorMessage = "该产品已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Create([FromBody]ProductModel model)
        {
            if (ValidationService.DuplicateValidate(model))
            {
                return new ServiceResponse { Response = _product.Create(model) };
            }

            return new ServiceResponse { ErrorMessage = "该产品已存在，请重新输入" };
        }

        [HttpPost]
        public ServiceResponse Delete([FromBody]int id)
        {
            if (ValidationService.UsageValiate(new CategoryModel { Id = id }))
            {
                return new ServiceResponse { Response = _product.Delete(id) };
            }

            return new ServiceResponse { ErrorMessage = "该产品无法删除" };
        }
    }
}
