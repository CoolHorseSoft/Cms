namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class RoleGroup : BusinessCoreBase<RoleGroupModel, int>
    {
        public override IEnumerable<RoleGroupModel> GetAll()
        {
            return DataStorageService.GetAllRoleGroups();
        }

        public override RoleGroupModel GetByKey(int key)
        {
            return DataStorageService.FindRoleGroupById(key);
        }

        public override RoleGroupModel Create(RoleGroupModel model)
        {
            return DataStorageService.AddRoleGroup(model);

        }

        public override RoleGroupModel Update(RoleGroupModel model)
        {
            return DataStorageService.UpdateRoleGroup(model);

        }

        public override bool Delete(int key)
        {
            return DataStorageService.DeleteRoleGroup(key);

        }
    }
}
