namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region Category

        CategoryModel AddCategory(CategoryModel model);

        CategoryModel UpdateCategory(CategoryModel model);

        bool DeleteCategory(int id);

        CategoryModel FindCategoryById(int id);

        IEnumerable<CategoryModel> GetAllCategories();

        #endregion
    }
}
