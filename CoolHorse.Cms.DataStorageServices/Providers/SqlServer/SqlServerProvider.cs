using System.Data;

namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Configuration.Provider;
    using System.Web.Configuration;

    using Models;

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
            throw new NotImplementedException();
        }

        public CategoryModel FindCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CategoryModel> GetAllCategories()
        {
            var script = "SELECT * FROM CATEGORY;";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateModel(ds);
        }

        public CategoryModel UpdateCategory(CategoryModel categoryModel)
        {
            throw new NotImplementedException();
        } 
        #endregion

        public IEnumerable<CategoryModel> PopulateModel(DataSet ds)
        {
            var models = new List<CategoryModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new CategoryModel();
                    model.Description = rowItem["Description"].ToString();
                    model.ParentId = int.Parse(rowItem["ParentId"].ToString());
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
