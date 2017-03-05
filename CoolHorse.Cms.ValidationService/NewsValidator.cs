namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System.Collections.Generic;

    public class NewsValidator : IValidator<NewsModel>
    {
        public bool Validate(NewsModel model)
        {
            var a = new List<int>();
            throw new System.NotImplementedException();
        }
    }
}
