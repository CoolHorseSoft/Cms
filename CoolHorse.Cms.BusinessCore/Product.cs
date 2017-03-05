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

        public override bool Validate(ProductModel model)
        {
            return ValidationService.Validate<ProductModel>(model);
        }

        public override IEnumerable<ClientValidationRule> ClientRules
        {
            get { return ValidationService.GenerateClientRules<ProductModel>(); }
        }
    }
}
