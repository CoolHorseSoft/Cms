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
        public UserModel AddUser(UserModel model)
        {
            var script = string.Format("INSERT INTO [User](UserName,Password) VALUES('{0}','{1}');SELECT @@IDENTITY;",model.UserName,model.Password);

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return model;
        }

        public UserModel UpdateUser(UserModel model)
        {
            var script = string.Format("UPDATE [User] SET UserName='{0}',Password = '{1}' WHERE Id ={2}", model.UserName, model.Password, model.Id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return model;
        }

        public bool DeleteUser(int id)
        {
            var script =string.Format("DELETE FROM [User] WHERE Id = {0}",id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public UserModel FindUserById(int id)
        {
            var script =string.Format("SELECT * FROM [User] WHERE Id = {0}",id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateUser(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<UserModel> GetAllUsers()
        {
            var script = "SELECT * FROM [User];";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateUser(ds);
        }

        private IList<UserModel> PopulateUser(DataSet ds)
        {
            var models = new List<UserModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new UserModel();
                    model.UserName = rowItem["UserName"].ToString();
                    model.Id = int.Parse(rowItem["Id"].ToString());
                    model.Password = rowItem["Password"].ToString();
                    model.DateCreated = DateTime.Parse(rowItem["DateCreated"].ToString());
                    model.DateUpdated = DateTime.Parse(rowItem["DateUpdated"].ToString());
                    models.Add(model);
                }
            }

            return models;
        }
    }
}
