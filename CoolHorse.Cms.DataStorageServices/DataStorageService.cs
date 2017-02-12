using System.Collections.Generic;

namespace CoolHorse.Cms.DataStorageServices
{
    using Models;

    public static class DataStorageService
    {
        private static readonly IDataStorageProvider dataStorageProvider = null;

        #region Category
        public static CategoryModel AddCategory(CategoryModel categoryModel)
        {
            return dataStorageProvider.AddCategory(categoryModel);
        }

        public static CategoryModel UpdateCategory(CategoryModel categoryModel)
        {
            return dataStorageProvider.UpdateCategory(categoryModel);
        }

        public static bool DeleteCategory(int id)
        {
            return dataStorageProvider.DeleteCategory(id);
        }

        public static CategoryModel FindCategoryById(int id)
        {
            return dataStorageProvider.FindCategoryById(id);
        }

        public static IList<CategoryModel> GetAllCategories()
        {
            return dataStorageProvider.GetAllCategories();
        } 
        #endregion
    }
}
