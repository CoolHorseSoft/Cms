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
        public RoleModel AddRole(RoleModel model)
        {
            var script = string.Format("INSERT INTO [Role](RoleName,Description) VALUES('{0}','{1}');SELECT @@IDENTITY;",model.RoleName,model.Description);

            model.Id = _dbConnector.GetIntegerValue(new SqlCommand(script));

            return model;
        }

        public RoleModel UpdateRole(RoleModel model)
        {
            var script = string.Format("UPDATE [Role] SET RoleName='{0}',Description = '{1}' WHERE Id ={2}", model.RoleName, model.Description, model.Id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return model;
        }

        public bool DeleteRole(int id)
        {
            var script =string.Format("DELETE FROM [Role] WHERE Id = {0}",id);

            _dbConnector.ExecuteCommand(new SqlCommand(script));

            return true;
        }

        public RoleModel FindRoleById(int id)
        {
            var script =string.Format("SELECT * FROM [Role] WHERE Id = {0}",id);

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            var models = PopulateRole(ds);

            return models.Count == 1 ? models.First() : null;
        }

        public IEnumerable<RoleModel> GetAllRoles()
        {
            var script = "SELECT * FROM [Role];";

            var ds = _dbConnector.ExecuteCommandsDataSet(new SqlCommand(script));

            return PopulateRole(ds);
        }

        private IList<RoleModel> PopulateRole(DataSet ds)
        {
            var models = new List<RoleModel>();

            if (ds != null)
            {
                foreach (DataRow rowItem in ds.Tables[0].Rows)
                {
                    var model = new RoleModel();
                    model.RoleName = rowItem["RoleName"].ToString();
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
