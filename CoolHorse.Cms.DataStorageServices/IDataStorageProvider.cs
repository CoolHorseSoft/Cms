namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public interface IDataStorageProvider
    {
        #region Category

        CategoryModel AddCategory(CategoryModel categoryModel);

        CategoryModel UpdateCategory(CategoryModel categoryModel);

        bool DeleteCategory(int id);

        CategoryModel FindCategoryById(int id);

        IEnumerable<CategoryModel> GetAllCategories();

        #endregion
    }
}
