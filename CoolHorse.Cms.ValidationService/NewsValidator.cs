namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System;

    public class NewsValidator : IKeyDuplicateValidtor<NewsModel>, IUsageValidator<NewsModel>
    {
        public bool DuplicateValidate(NewsModel model)
        {
            throw new NotImplementedException();
        }

        public bool UsageValidate(NewsModel model)
        {
            throw new NotImplementedException();
        }
    }
}
