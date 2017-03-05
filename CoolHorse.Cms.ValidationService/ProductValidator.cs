namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System.Collections.Generic;

    internal class ProductValidator : IValidator<ProductModel>
    {
        public bool Validate(ProductModel model)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ClientValidationRule> GenerateClientRules(ProductModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}
