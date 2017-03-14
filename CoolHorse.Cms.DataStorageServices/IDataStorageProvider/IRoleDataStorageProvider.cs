namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region Role

        RoleModel AddRole(RoleModel model);

        RoleModel UpdateRole(RoleModel model);

        bool DeleteRole(int id);

        RoleModel FindRoleById(int id);

        IEnumerable<RoleModel> GetAllRoles();

        #endregion
    }
}
