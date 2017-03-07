namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using System.Collections.Generic;

    public class Category : BusinessCoreBase<CategoryModel, int>
    {
        public override IEnumerable<CategoryModel> GetAll()
        {
            return DataStorageService.GetAllCategories();
        }

        public override CategoryModel GetByKey(int key)
        {
            return DataStorageService.FindCategoryById(key);
        }

        public override CategoryModel Create(CategoryModel model)
        {
            return DataStorageService.AddCategory(model);
        }

        public override CategoryModel Update(CategoryModel model)
        {
            return DataStorageService.UpdateCategory(model);
        }

        public override bool Delete(int key)
        {
            return DataStorageService.DeleteCategory(key);

        }
    }
}
