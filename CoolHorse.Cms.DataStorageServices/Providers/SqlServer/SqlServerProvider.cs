namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;

    using Models;

    public class SqlServerProvider : IDataStorageProvider
    {
        private readonly ISqlServerDbConnector _dbConnector = new SqlServerDbConnector("");
        public CategoryModel AddCategory(CategoryModel categoryModel)
        {
            var script = $"INSERT INTO CATEGORY SELECT {categoryModel.Title} {categoryModel.Description};SELECT @@IDENTITY;";

            categoryModel.Id =  _dbConnector.GetIntegerValue(new SqlCommand(script));

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
    }
}
