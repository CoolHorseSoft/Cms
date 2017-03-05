namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System.Collections.Generic;

    internal class NewsValidator : IValidator<NewsModel>
    {
        public bool Validate(NewsModel model)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ClientValidationRule> GenerateClientRules(NewsModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}
