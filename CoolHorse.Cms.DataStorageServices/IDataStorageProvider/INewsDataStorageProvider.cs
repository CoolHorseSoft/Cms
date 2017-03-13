namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region News

        NewsModel AddNews(NewsModel model);

        NewsModel UpdateNews(NewsModel model);

        bool DeleteNews(int id);

        NewsModel FindNewsById(int id);

        IEnumerable<NewsModel> GetAllNews();

        #endregion
    }
}
