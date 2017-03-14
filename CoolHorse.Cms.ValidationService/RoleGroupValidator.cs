using System;
using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class RoleGroupValidator : IKeyDuplicateValidtor<RoleGroupModel>, IUsageValidator<RoleGroupModel>
    {
        public bool DuplicateValidate(RoleGroupModel model)
        {
            var sameTitleCategoryExists = DataStorageService.GetAllRoleGroups().Any(c => c.RoleGroupName.Equals(model.RoleGroupName, StringComparison.CurrentCultureIgnoreCase) && !c.Id.Equals(model.Id));

            return !sameTitleCategoryExists;
        }

        public bool UsageValidate(RoleGroupModel model)
        {
            return false;
        }
    }
}
