namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using ValidationService;
    using System.Collections.Generic;

    public class Product: BusinessCoreBase<ProductModel, int>
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
            if (Validate(model))
            {
                return DataStorageService.AddProduct(model);
            }

            return null;
        }

        public override ProductModel Update(ProductModel model)
        {
            if (Validate(model))
            {
                return DataStorageService.UpdateProduct(model);
            }

            return null;
        }

        public override bool Delete(int key)
        {
            if (Validate(GetByKey(key)))
            {
                return DataStorageService.DeleteProduct(key);
            }

            return false;
        }

        public override bool Validate(ProductModel model)
        {
            return ValidationService.Validate<ProductModel>(model);
        }
    }
}
