namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region News
        public static NewsModel AddNews(NewsModel model)
        {
            return Provider.AddNews(model);
        }

        public static NewsModel UpdateNews(NewsModel model)
        {
            return Provider.UpdateNews(model);
        }

        public static bool DeleteNews(int id)
        {
            return Provider.DeleteNews(id);
        }

        public static NewsModel FindNewsById(int id)
        {
            return Provider.FindNewsById(id);
        }

        public static IEnumerable<NewsModel> GetAllNews()
        {
            return Provider.GetAllNews();
        }
        #endregion
    }
}
