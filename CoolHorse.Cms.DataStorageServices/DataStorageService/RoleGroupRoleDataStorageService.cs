namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region RoleGroupRole
        public static RoleGroupModel AddRoleGroupRole(RoleGroupModel model)
        {
            return Provider.AddRoleGroupRole(model);
        }

        public static RoleGroupModel UpdateRoleGroupRole(RoleGroupModel model)
        {
            return Provider.UpdateRoleGroupRole(model);
        }

        public static RoleGroupModel GetRoleGroupRole(RoleGroupModel roleGroup)
        {
            return Provider.GetRoleGroupRole(roleGroup);
        }

        public static IEnumerable<RoleGroupModel> GetRoleGroupRole(IEnumerable<RoleGroupModel> roleGroups)
        {
            return Provider.GetRoleGroupRole(roleGroups);
        }

        public static void DeleteRoleGroupRole(int roleGroupId)
        {
            Provider.DeleteRoleGroupRole(roleGroupId);
        }
        #endregion
    }
}
