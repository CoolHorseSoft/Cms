namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class News : BusinessCoreBase<NewsModel, int>
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
            return DataStorageService.AddNews(model);

        }

        public override NewsModel Update(NewsModel model)
        {
            return DataStorageService.UpdateNews(model);

        }

        public override bool Delete(int key)
        {
            return DataStorageService.DeleteNews(key);

        }
    }
}
