namespace CoolHorse.Cms.Api.Controllers
{
    using Models;
    using System.Collections.Generic;
    using System.Web.Http;
    using BusinessCore;

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
        public IEnumerable<ProductModel> GetAll()
        {
            return _product.GetAll();
        }

        [HttpGet]
        public ProductModel GetById(int id)
        {
            return _product.GetByKey(id);
        }

        /// <summary>
        /// Update a Product
        /// </summary>
        /// <param name="model"></param>
        /// <see cref="ProductModel"/>
        /// <returns></returns>
        [HttpPost]
        public ProductModel Update([FromBody]ProductModel model)
        {
            return _product.Update(model);
        }

        [HttpPost]
        public ProductModel Create([FromBody]ProductModel model)
        {
            return _product.Create(model);
        }

        [HttpPost]
        public bool Delete([FromBody]int id)
        {
            return _product.Delete(id);
        }
    }
}
