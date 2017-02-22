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

        public IList<CategoryModel> GetAllCategories()
        {
            throw new NotImplementedException();
        }

        public CategoryModel UpdateCategory(CategoryModel categoryModel)
        {
            throw new NotImplementedException();
        } 
        #endregion
    }
}
