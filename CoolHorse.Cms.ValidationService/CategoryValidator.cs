using System;
using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class CategoryValidator : IKeyDuplicateValidtor<CategoryModel>, IUsageValidator<CategoryModel>
    {
        public bool DuplicateValidate(CategoryModel model)
        {
            var sameTitleCategoryExists = DataStorageService.GetAllCategories().Any(c => c.Title.Equals(model.Title, StringComparison.CurrentCultureIgnoreCase) && !c.Id.Equals(model.Id));

            return !sameTitleCategoryExists;
        }

        public bool UsageValidate(CategoryModel model)
        {
            var categoryUsed = DataStorageService.GetAllNews().Any(n => n.Category.Id.Equals(model.Id));

            if (!categoryUsed)
            {
                categoryUsed = DataStorageService.GetAllProducts().Any(n => n.Category.Id.Equals(model.Id));
            }

            return !categoryUsed;
        }
    }
}
