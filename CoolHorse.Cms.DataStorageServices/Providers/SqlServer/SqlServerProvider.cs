namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using Models;
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data;
    using System.Data.SqlClient;
    using System.Web.Configuration;

    public class SqlServerProvider : ProviderBase,IDataStorageProvider
    {
        private readonly ISqlServerDbConnector _dbConnector;

        public SqlServerProvider()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["Cms"].ConnectionString;
            _dbConnector =  new SqlServerDbConnector(connectionString);
        }

        #region Interface Implemented

        public CategoryModel AddCategory(CategoryModel categoryModel)
        {
            var script = "INSERT INTO CATEGORY(Title,Description) VALUES( '" + categoryModel.Title +"', '" + categoryModel.Description + "' );SELECT @@IDENTITY;";

            categoryModel.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return categoryModel;
        }

        public bool DeleteCategory(int id)
        {
            var script = "DELETE FROM CATEGORY WHERE Id = " + id;

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public CategoryModel FindCategoryById(int id)
        {
            var script = "SELECT * FROM CATEGORY WHERE Id = " + id;

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateModels(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<CategoryModel> GetAllCategories()
        {
            var script = "SELECT * FROM CATEGORY;";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateModels(ds);
        }

        public CategoryModel UpdateCategory(CategoryModel categoryModel)
        {
            var script = "UPDATE CATEGORY SET Title='" + categoryModel.Title + "',Description = '" + categoryModel.Description + "' WHERE Id =" + categoryModel.Id;

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return categoryModel;
        } 
        #endregion

        private IList<CategoryModel> PopulateModels(DataSet ds)
        {
            var models = new List<CategoryModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new CategoryModel();
                    model.Description = rowItem["Description"].ToString();
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
