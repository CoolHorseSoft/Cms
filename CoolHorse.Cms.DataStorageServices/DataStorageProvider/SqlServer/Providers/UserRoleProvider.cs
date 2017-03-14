namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data.SqlClient;
    using Models;

    public partial class SqlServerProvider : ProviderBase, IDataStorageProvider
    {
        public UserModel AddUserRole(UserModel model)
        {
            AddUserRoles(model.Id, model.Roles);

            return model;
        }

        public UserModel UpdateUserRole(UserModel model)
        {
            DeleteUserRole(model.Id);

            return AddUserRole(model);
        }


        public void DeleteUserRole(int userId)
        {
            var script = string.Format("DELETE FROM [UserRole] WHERE UserId = {0}", userId);

            _dbConnector.ExecuteCommand(new SqlCommand(script));
        }


        public UserModel GetUserRoles(UserModel model)
        {
            var script = string.Format("SELECT Role.* FROM [UserRole] INNER JOIN Role ON UserRole.RoleId = Role.Id WHERE UserRole.UserId = {0}", model.Id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            model.Roles = PopulateRole(ds);

            return model;
        }

        private void AddUserRoles(int userId, IEnumerable<RoleModel> roles)
        {
            var commands = new List<SqlCommand>();

            foreach (var roleModel in roles)
            {
                var script = string.Format("INSERT INTO [UserRole](UserId,RoleId) VALUES('{0}','{1}');", userId, roleModel.Id);

                commands.Add(new SqlCommand(script));
            }

            _dbConnector.ExecuteCommands(commands);
        }
    }
}
