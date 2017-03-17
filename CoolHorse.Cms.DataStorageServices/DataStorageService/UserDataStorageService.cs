namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region User
        public static UserModel AddUser(UserModel model)
        {
            return Provider.AddUser(model);
        }

        public static UserModel UpdateUser(UserModel model)
        {
            return Provider.UpdateUser(model);
        }

        public static bool DeleteUser(int id)
        {
            return Provider.DeleteUser(id);
        }

        public static UserModel FindUserById(int id)
        {
            return Provider.FindUserById(id);
        }

        public static IEnumerable<UserModel> GetAllUsers()
        {
            return Provider.GetAllUsers();
        }

        public static string Authenticate(string userName, string password)
        {
            return Provider.Authenticate(userName,password);
        }

        public static UserModel GetUserByAuthenticate(string authentication)
        {
            return Provider.GetUserByAuthenticate(authentication);
        }
        #endregion
    }
}
