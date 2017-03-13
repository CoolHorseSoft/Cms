namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class User : BusinessCoreBase<UserModel, int>
    {
        public override IEnumerable<UserModel> GetAll()
        {
            return DataStorageService.GetAllUsers();
        }

        public override UserModel GetByKey(int key)
        {
            return DataStorageService.FindUserById(key);
        }

        public override UserModel Create(UserModel model)
        {
            return DataStorageService.AddUser(model);

        }

        public override UserModel Update(UserModel model)
        {
            return DataStorageService.UpdateUser(model);

        }

        public override bool Delete(int key)
        {
            return DataStorageService.DeleteUser(key);

        }
    }
}
