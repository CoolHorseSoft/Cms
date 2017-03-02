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
        public ProductModel AddProduct(ProductModel model)
        {
            var script =$"INSERT INTO Product(Title,Content,CategoryId) VALUES('{model.Title}','{model.Content}',{model.CategoryId})";

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return model;
        }

        public ProductModel UpdateProduct(ProductModel model)
        {
            var script = $"UPDATE Product SET Title='{ model.Title}',Content = '{ model.Content}',CategoryId = {model.CategoryId} WHERE Id =" + model.Id;

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return model;
        }

        public bool DeleteProduct(int id)
        {
            var script =$"DELETE FROM Product WHERE Id = {id}";

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public ProductModel FindProductById(int id)
        {
            var script =$"SELECT * FROM Product WHERE Id = {id}";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateProduct(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<ProductModel> GetAllProducts()
        {
            var script = "SELECT * FROM Product;";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateProduct(ds);
        }

        private IList<ProductModel> PopulateProduct(DataSet ds)
        {
            var models = new List<ProductModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new ProductModel();
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
