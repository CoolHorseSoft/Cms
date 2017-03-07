namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class Product : BusinessCoreBase<ProductModel, int>
    {
        public override IEnumerable<ProductModel> GetAll()
        {
            return DataStorageService.GetAllProducts();
        }

        public override ProductModel GetByKey(int key)
        {
            return DataStorageService.FindProductById(key);
        }

        public override ProductModel Create(ProductModel model)
        {
            return DataStorageService.AddProduct(model);
        }

        public override ProductModel Update(ProductModel model)
        {

            return DataStorageService.UpdateProduct(model);
        }

        public override bool Delete(int key)
        {

            return DataStorageService.DeleteProduct(key);
        }
    }
}
