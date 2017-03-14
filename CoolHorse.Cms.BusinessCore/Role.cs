namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class Role : BusinessCoreBase<RoleModel, int>
    {
        public override IEnumerable<RoleModel> GetAll()
        {
            return DataStorageService.GetAllRoles();
        }

        public override RoleModel GetByKey(int key)
        {
            return DataStorageService.FindRoleById(key);
        }

        public override RoleModel Create(RoleModel model)
        {
            return DataStorageService.AddRole(model);

        }

        public override RoleModel Update(RoleModel model)
        {
            return DataStorageService.UpdateRole(model);

        }

        public override bool Delete(int key)
        {
            return DataStorageService.DeleteRole(key);

        }
    }
}
