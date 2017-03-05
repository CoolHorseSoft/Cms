namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using ValidationService;
    using System.Collections.Generic;

    public class News: BusinessCoreBase<NewsModel, int>
    {
        public override IEnumerable<NewsModel> GetAll()
        {
            return DataStorageService.GetAllNews();
        }

        public override NewsModel GetByKey(int key)
        {
            return DataStorageService.FindNewsById(key);
        }

        public override NewsModel Create(NewsModel model)
        {
            if (Validate(model))
                return DataStorageService.AddNews(model);

            return null;
        }

        public override NewsModel Update(NewsModel model)
        {
            if (Validate(model))
                return DataStorageService.UpdateNews(model);

            return null;
        }

        public override bool Delete(int key)
        {
            if (Validate(GetByKey(key)))
                return DataStorageService.DeleteNews(key);

            return false;
        }

        public override bool Validate(NewsModel model)
        {
            return ValidationService.Validate<NewsModel>(model);
        }
    }
}
