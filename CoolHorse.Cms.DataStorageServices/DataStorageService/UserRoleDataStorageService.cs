namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region UserRole
        public static UserModel AddUserRole(UserModel model)
        {
            return Provider.AddUserRole(model);
        }

        public static UserModel UpdateUserRole(UserModel model)
        {
            return Provider.UpdateUserRole(model);
        }

        public static void DeleteUserRole(int userId)
        {
            Provider.DeleteUserRole(userId);
        }

        public static UserModel GetUserRoles(UserModel model)
        {
            return Provider.GetUserRoles(model);
        }
        #endregion
    }
}
