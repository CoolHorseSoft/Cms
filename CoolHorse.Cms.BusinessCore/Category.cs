namespace CoolHorse.Cms.BusinessCore
{
    using DataStorageServices;
    using Models;
    using ValidationService;
    using System.Collections.Generic;

    public class Category:BusinessCoreBase<CategoryModel, int>
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
            if (Validate(model))
                return DataStorageService.AddCategory(model);

            return null;
        }

        public override CategoryModel Update(CategoryModel model)
        {
            if (Validate(model))
                return DataStorageService.UpdateCategory(model);

            return null;
        }

        public override bool Delete(int key)
        {
            if (Validate(GetByKey(key)))
                return DataStorageService.DeleteCategory(key);

            return false;
        }

        public override bool Validate(CategoryModel model)
        {
            return ValidationService.Validate<CategoryModel>(model);
        }
    }
}
