namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region RoleGroup
        public static RoleGroupModel AddRoleGroup(RoleGroupModel model)
        {
            return Provider.AddRoleGroup(model);
        }

        public static RoleGroupModel UpdateRoleGroup(RoleGroupModel model)
        {
            return Provider.UpdateRoleGroup(model);
        }

        public static bool DeleteRoleGroup(int id)
        {
            return Provider.DeleteRoleGroup(id);
        }

        public static RoleGroupModel FindRoleGroupById(int id)
        {
            return Provider.FindRoleGroupById(id);
        }

        public static IEnumerable<RoleGroupModel> GetAllRoleGroups()
        {
            return Provider.GetAllRoleGroups();
        }
        #endregion
    }
}
