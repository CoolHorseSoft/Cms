namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region UserRoleGroup

        UserModel AddUserRoleGroup(UserModel model);

        UserModel UpdateUserRoleGroup(UserModel model);

        void DeleteUserRoleGroup(int userId);

        UserModel GetUserRoleGroups(UserModel model);

        #endregion
    }
}
