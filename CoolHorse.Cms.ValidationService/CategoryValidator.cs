using System;
using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using DataStorageServices;

    public class CategoryValidator : IValidator<CategoryModel>
    {
        public bool Validate(CategoryModel model)
        {
            var sameTitleCategoryExists =DataStorageService.GetAllCategories().Any(c =>c.Title.Equals(model.Title, StringComparison.CurrentCultureIgnoreCase) &&!c.Id.Equals(model.Id));

            return !sameTitleCategoryExists;
        }
    }
}
