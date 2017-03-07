namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System;

    public class ProductValidator : IKeyDuplicateValidtor<ProductModel>, IUsageValidator<ProductModel>
    {
        public bool DuplicateValidate(ProductModel model)
        {
            throw new NotImplementedException();
        }

        public bool UsageValidate(ProductModel model)
        {
            throw new NotImplementedException();
        }
    }
}
