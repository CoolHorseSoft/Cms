namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region UserRole

        UserModel AddUserRole(UserModel model);

        UserModel UpdateUserRole(UserModel model);

        void DeleteUserRole(int userId);

        UserModel GetUserRoles(UserModel model);

        #endregion
    }
}
