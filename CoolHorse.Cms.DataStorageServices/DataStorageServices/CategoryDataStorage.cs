namespace CoolHorse.Cms.DataStorageServices
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region Category
        public static CategoryModel AddCategory(CategoryModel categoryModel)
        {
            return Provider.AddCategory(categoryModel);
        }

        public static CategoryModel UpdateCategory(CategoryModel categoryModel)
        {
            return Provider.UpdateCategory(categoryModel);
        }

        public static bool DeleteCategory(int id)
        {
            return Provider.DeleteCategory(id);
        }

        public static CategoryModel FindCategoryById(int id)
        {
            return Provider.FindCategoryById(id);
        }

        public static IEnumerable<CategoryModel> GetAllCategories()
        {
            return Provider.GetAllCategories();
        }
        #endregion
    }
}
