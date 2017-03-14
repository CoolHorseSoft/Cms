using System.Collections.Generic;

namespace CoolHorse.Cms.DataStorageServices
{
    using Models;

    public partial interface IDataStorageProvider
    {
        #region RoleGroup

        RoleGroupModel AddRoleGroupRole(RoleGroupModel model);

        RoleGroupModel UpdateRoleGroupRole(RoleGroupModel model);

        IEnumerable<RoleGroupModel> GetRoleGroupRole(IEnumerable<RoleGroupModel> roleGroup);

        RoleGroupModel GetRoleGroupRole(RoleGroupModel roleGroup);

        void DeleteRoleGroupRole(int roleGroupId);

        #endregion
    }
}
