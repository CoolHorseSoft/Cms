namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region Role
        public static RoleModel AddRole(RoleModel model)
        {
            return Provider.AddRole(model);
        }

        public static RoleModel UpdateRole(RoleModel model)
        {
            return Provider.UpdateRole(model);
        }

        public static bool DeleteRole(int id)
        {
            return Provider.DeleteRole(id);
        }

        public static RoleModel FindRoleById(int id)
        {
            return Provider.FindRoleById(id);
        }

        public static IEnumerable<RoleModel> GetAllRoles()
        {
            return Provider.GetAllRoles();
        }
        #endregion
    }
}
