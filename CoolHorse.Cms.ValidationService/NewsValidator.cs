namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System;

    public class NewsValidator : IKeyDuplicateValidtor<NewsModel>, IUsageValidator<NewsModel>
    {
        public bool DuplicateValidate(NewsModel model)
        {
            return true;
        }

        public bool UsageValidate(NewsModel model)
        {
            return true;
        }
    }
}
