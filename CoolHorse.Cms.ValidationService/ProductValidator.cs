namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System;

    public class ProductValidator : IKeyDuplicateValidtor<ProductModel>, IUsageValidator<ProductModel>
    {
        public bool DuplicateValidate(ProductModel model)
        {
            return true;
        }

        public bool UsageValidate(ProductModel model)
        {
            return true;
        }
    }
}
