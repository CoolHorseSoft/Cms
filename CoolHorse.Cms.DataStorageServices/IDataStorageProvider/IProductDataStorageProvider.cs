namespace CoolHorse.Cms.DataStorageServices
{
    using System.Collections.Generic;
    using Models;

    public partial interface IDataStorageProvider
    {
        #region Product

        ProductModel AddProduct(ProductModel model);

        ProductModel UpdateProduct(ProductModel model);

        bool DeleteProduct(int id);

        ProductModel FindProductById(int id);

        IEnumerable<ProductModel> GetAllProducts();

        #endregion
    }
}
