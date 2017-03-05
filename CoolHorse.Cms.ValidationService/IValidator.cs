namespace CoolHorse.Cms.ValidationService
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;

    internal interface IValidator<TModel>
    {
        bool Validate(TModel model);

        IEnumerable<ClientValidationRule> GenerateClientRules(TModel model);
    }
}
