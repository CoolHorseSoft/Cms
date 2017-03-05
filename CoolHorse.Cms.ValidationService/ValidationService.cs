namespace CoolHorse.Cms.ValidationService
{
    using Models;
using System.Collections.Generic;

    public class ValidationService
    {
        public static bool Validate<TModel>(TModel model)
        {
            return true;
        }

        public static IEnumerable<ClientValidationRule> GenerateClientRules<TModel>()
        {
            return null;
        }
    }
}
