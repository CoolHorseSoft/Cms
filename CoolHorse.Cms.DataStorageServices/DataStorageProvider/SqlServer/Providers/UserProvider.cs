namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data;
    using System.Data.SqlClient;
    using Models;
    using System.Linq;

    public partial class SqlServerProvider : ProviderBase, IDataStorageProvider
    {
        public string Authenticate(string userName, string password)
        {
            var script = string.Format("SELECT [Id] FROM [User] WHERE UserName='{0}' AND [Password] = '{1}';",userName,password);

            var userId = _dbConnector.GetIntegerValue(new SqlCommand(script));

            if (userId > 0)
            {
                var guid = Guid.NewGuid().ToString();

                script = string.Format("INSERT INTO UserAuthentication(UserId,Authentication) VALUES ({0},'{1}')",userId, guid);

                _dbConnector.ExecuteCommand(new SqlCommand(script));

                return guid;
            }

            return string.Empty;
        }

        public UserModel GetUserByAuthenticate(string authentication)
        {
            var script = string.Format("SELECT [User].* FROM [User] INNER JOIN [UserAuthentication] ON [User].Id = [UserAuthentication].UserId WHERE [UserAuthentication].Authentication = '{0}'", authentication);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateUser(ds);

            var model = models.Count == 1 ? models.First() : null;

             DataStorageService.AddUserRole(model);

            DataStorageService.AddUserRoleGroup(model);

            return model;
        }

        public UserModel AddUser(UserModel model)
        {
            var script = string.Format("INSERT INTO [User](UserName,Password) VALUES('{0}','{1}');SELECT @@IDENTITY;",model.UserName,model.Password);

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            DataStorageService.AddUserRole(model);

            DataStorageService.AddUserRoleGroup(model);

            return model;
        }

        public UserModel UpdateUser(UserModel model)
        {
            var script = string.Format("UPDATE [User] SET UserName='{0}',Password = '{1}' WHERE Id ={2}", model.UserName, model.Password, model.Id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            DataStorageService.UpdateUserRole(model);

            DataStorageService.UpdateUserRoleGroup(model);

            return model;
        }

        public bool DeleteUser(int id)
        {
            DataStorageService.DeleteUserRole(id);

            DataStorageService.DeleteUserRoleGroup(id);

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
                    model = DataStorageService.GetUserRoles(model);
                    model = DataStorageService.GetUserRoleGroups(model);
                    models.Add(model);
                }
            }

            return models;
        }
    }
}
