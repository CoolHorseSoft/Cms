using System;
using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class UserValidator : IKeyDuplicateValidtor<UserModel>, IUsageValidator<UserModel>
    {
        public bool DuplicateValidate(UserModel model)
        {
            var sameTitleCategoryExists = DataStorageService.GetAllUsers().Any(c => c.UserName.Equals(model.UserName, StringComparison.CurrentCultureIgnoreCase) && !c.Id.Equals(model.Id));

            return !sameTitleCategoryExists;
        }

        public bool UsageValidate(UserModel model)
        {
            return false;
        }
    }
}
