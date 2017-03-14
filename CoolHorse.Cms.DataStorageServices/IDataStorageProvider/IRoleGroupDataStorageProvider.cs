namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region RoleGroup

        RoleGroupModel AddRoleGroup(RoleGroupModel model);

        RoleGroupModel UpdateRoleGroup(RoleGroupModel model);

        bool DeleteRoleGroup(int id);

        RoleGroupModel FindRoleGroupById(int id);

        IEnumerable<RoleGroupModel> GetAllRoleGroups();

        #endregion
    }
}
