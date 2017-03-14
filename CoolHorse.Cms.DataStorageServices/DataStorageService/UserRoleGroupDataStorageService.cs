namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region UserRoleGroup
        public static UserModel AddUserRoleGroup(UserModel model)
        {
            return Provider.AddUserRoleGroup(model);
        }

        public static UserModel UpdateUserRoleGroup(UserModel model)
        {
            return Provider.UpdateUserRoleGroup(model);
        }

        public static void DeleteUserRoleGroup(int userId)
        {
            Provider.DeleteUserRoleGroup(userId);
        }

        public static UserModel GetUserRoleGroups(UserModel model)
        {
            return Provider.GetUserRoleGroups(model);
        }
        #endregion
    }
}
