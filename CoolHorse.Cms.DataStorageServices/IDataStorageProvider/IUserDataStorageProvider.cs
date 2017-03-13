namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region User

        UserModel AddUser(UserModel model);

        UserModel UpdateUser(UserModel model);

        bool DeleteUser(int id);

        UserModel FindUserById(int id);

        IEnumerable<UserModel> GetAllUsers();

        #endregion
    }
}
