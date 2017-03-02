using System.Linq;

namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data;
    using System.Data.SqlClient;
    using Models;

    public partial class SqlServerProvider : ProviderBase, IDataStorageProvider
    {
        public NewsModel AddNews(NewsModel model)
        {
            var script =$"INSERT INTO News(Title,Content,CategoryId) VALUES('{model.Title}','{model.Content}',{model.CategoryId});SELECT @@IDENTITY;";

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return model;
        }

        public NewsModel UpdateNews(NewsModel model)
        {
            var script = $"UPDATE News SET Title='{ model.Title}',Content = '{ model.Content}',CategoryId = {model.CategoryId} WHERE Id =" + model.Id;

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return model;
        }

        public bool DeleteNews(int id)
        {
            var script =$"DELETE FROM News WHERE Id = {id}";

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public NewsModel FindNewsById(int id)
        {
            var script =$"SELECT * FROM News WHERE Id = {id}";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateNews(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<NewsModel> GetAllNews()
        {
            var script = "SELECT * FROM News;";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateNews(ds);
        }

        private IList<NewsModel> PopulateNews(DataSet ds)
        {
            var models = new List<NewsModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new NewsModel();
                    model.Content = rowItem["Content"].ToString();
                    model.Id = int.Parse(rowItem["Id"].ToString());
                    model.Title = rowItem["Title"].ToString();
                    model.DateCreated = DateTime.Parse(rowItem["DateCreated"].ToString());
                    model.DateUpdated = DateTime.Parse(rowItem["DateUpdated"].ToString());
                    models.Add(model);
                }
            }

            return models;
        }
    }
}
