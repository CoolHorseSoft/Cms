namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class NewsValidator : IValidator<NewsModel>
    {
        public bool Validate(NewsModel model)
        {
            return true;
        }
    }
}
