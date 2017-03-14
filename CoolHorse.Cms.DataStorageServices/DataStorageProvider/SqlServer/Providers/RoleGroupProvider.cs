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
        public RoleGroupModel AddRoleGroup(RoleGroupModel model)
        {
            var script = string.Format("INSERT INTO [RoleGroup](RoleGroupName,Description) VALUES('{0}','{1}');SELECT @@IDENTITY;",model.RoleGroupName,model.Description);

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return model;
        }

        public RoleGroupModel UpdateRoleGroup(RoleGroupModel model)
        {
            var script = string.Format("UPDATE [RoleGroup] SET RoleGroupName='{0}',Description = '{1}' WHERE Id ={2}", model.RoleGroupName, model.Description, model.Id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return model;
        }

        public bool DeleteRoleGroup(int id)
        {
            var script =string.Format("DELETE FROM [RoleGroup] WHERE Id = {0}",id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public RoleGroupModel FindRoleGroupById(int id)
        {
            var script =string.Format("SELECT * FROM [RoleGroup] WHERE Id = {0}",id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateRoleGroup(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<RoleGroupModel> GetAllRoleGroups()
        {
            var script = "SELECT * FROM [RoleGroup];";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateRoleGroup(ds);
        }

        private IList<RoleGroupModel> PopulateRoleGroup(DataSet ds)
        {
            var models = new List<RoleGroupModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new RoleGroupModel();
                    model.RoleGroupName = rowItem["RoleGroupName"].ToString();
                    model.Id = int.Parse(rowItem["Id"].ToString());
                    model.Description = rowItem["Description"].ToString();
                    model.DateCreated = DateTime.Parse(rowItem["DateCreated"].ToString());
                    model.DateUpdated = DateTime.Parse(rowItem["DateUpdated"].ToString());
                    models.Add(model);
                }
            }

            return models;
        }
    }
}
