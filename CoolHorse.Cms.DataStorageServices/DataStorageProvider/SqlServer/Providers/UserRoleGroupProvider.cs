namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data.SqlClient;
    using Models;

    public partial class SqlServerProvider : ProviderBase, IDataStorageProvider
    {
        public UserModel AddUserRoleGroup(UserModel model)
        {
            var commands = new List<SqlCommand>();

            foreach (var roleGroupModel in model.RoleGroups)
            {
                var script = string.Format("INSERT INTO [UserRoleGroup](UserId,RoleGroupId) VALUES('{0}','{1}');", model.Id, roleGroupModel.Id);

                commands.Add(new SqlCommand(script));

                AddUserRoles(model.Id, roleGroupModel.Roles);
            }

            _dbConnector.ExecuteCommands(commands);

            return model;
        }

        public UserModel UpdateUserRoleGroup(UserModel model)
        {
            var commands = new List<SqlCommand>();

            foreach (var roleGroup in model.RoleGroups)
            {
                foreach (var role in roleGroup.Roles)
                {
                    var script = string.Format("DELETE FROM [UserRole] WHERE UserId = {0} AND RoleId = {1}", model.Id, role.Id);

                    commands.Add(new SqlCommand(script));
                }
            }

            _dbConnector.ExecuteCommands(commands);

            DeleteUserRoleGroup(model.Id);

            return AddUserRoleGroup(model);
        }


        public void DeleteUserRoleGroup(int userId)
        {
            var script = string.Format("DELETE FROM [UserRoleGroup] WHERE UserId = {0}", userId);

            _dbConnector.ExecuteCommand(new SqlCommand(script));
        }


        public UserModel GetUserRoleGroups(UserModel model)
        {
            var script = string.Format("SELECT RoleGroup.* FROM [UserRoleGroup] INNER JOIN RoleGroup ON UserRoleGroup.RoleGroupId = RoleGroup.Id WHERE UserRoleGroup.UserId = {0}", model.Id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            model.RoleGroups = PopulateRoleGroup(ds);

            return model;
        }
    }
}
