using System;
using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class RoleValidator : IKeyDuplicateValidtor<RoleModel>, IUsageValidator<RoleModel>
    {
        public bool DuplicateValidate(RoleModel model)
        {
            var sameTitleCategoryExists = DataStorageService.GetAllRoles().Any(c => c.RoleName.Equals(model.RoleName, StringComparison.CurrentCultureIgnoreCase) && !c.Id.Equals(model.Id));

            return !sameTitleCategoryExists;
        }

        public bool UsageValidate(RoleModel model)
        {
            return false;
        }
    }
}
