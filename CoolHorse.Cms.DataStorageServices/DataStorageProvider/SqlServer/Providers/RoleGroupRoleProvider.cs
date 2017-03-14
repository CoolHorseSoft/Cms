namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using System.Data.SqlClient;
    using Models;

    public partial class SqlServerProvider : ProviderBase, IDataStorageProvider
    {
        public RoleGroupModel AddRoleGroupRole(RoleGroupModel model)
        {
            var commands = new List<SqlCommand>();

            foreach (var roleModel in model.Roles)
            {
                var script = string.Format("INSERT INTO [RoleGroupRole](RoleGroupId,RoleId) VALUES('{0}','{1}');", model.Id, roleModel.Id);

                commands.Add(new SqlCommand(script));
            }

            _dbConnector.ExecuteCommands(commands);

            return model;
        }

        public RoleGroupModel UpdateRoleGroupRole(RoleGroupModel model)
        {
            var commands = new List<SqlCommand>();

            commands.Add(new SqlCommand(string.Format("DELETE FROM [RoleGroupRole] WHERE RoleGroupId = {0}", model.Id)));

            foreach (var roleModel in model.Roles)
            {
                var script = string.Format("INSERT INTO [RoleGroupRole](RoleGroupId,RoleId) VALUES('{0}','{1}');", model.Id, roleModel.Id);

                commands.Add(new SqlCommand(script));
            }

            _dbConnector.ExecuteCommands(commands);

            return model;
        }

        public IEnumerable<RoleGroupModel> GetRoleGroupRole(IEnumerable<RoleGroupModel> roleGroups)
        {
            foreach (var roleGroup in roleGroups)
            {
                var script = string.Format("SELECT Role.* FROM [RoleGroupRole] INNER JOIN Role ON RoleGroupRole.RoleId = Role.Id WHERE RoleGroupRole.RoleGroupId = {0}", roleGroup.Id);

                var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

                roleGroup.Roles = PopulateRole(ds);

            }

            return roleGroups;
        }

        public RoleGroupModel GetRoleGroupRole(RoleGroupModel roleGroup)
        {
            var script = string.Format("SELECT Role.* FROM [RoleGroupRole] INNER JOIN Role ON RoleGroupRole.RoleId = Role.Id WHERE RoleGroupRole.RoleGroupId = {0}", roleGroup.Id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            roleGroup.Roles = PopulateRole(ds);

            return roleGroup;
        }

        public void DeleteRoleGroupRole(int roleGroupId)
        {
            var script = string.Format("DELETE FROM [RoleGroupRole] WHERE RoleGroupId = {0};", roleGroupId);

            _dbConnector.ExecuteCommand(new SqlCommand(script));
        }
    }
}
