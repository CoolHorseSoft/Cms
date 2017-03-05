namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System.Collections.Generic;

    internal class CategoryValidator : IValidator<CategoryModel>
    {
        public bool Validate(CategoryModel model)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ClientValidationRule> GenerateClientRules(CategoryModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}
