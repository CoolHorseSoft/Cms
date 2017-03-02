namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;

    public static partial class DataStorageService
    {
        #region Product
        public static ProductModel AddProduct(ProductModel model)
        {
            return Provider.AddProduct(model);
        }

        public static ProductModel UpdateProduct(ProductModel model)
        {
            return Provider.UpdateProduct(model);
        }

        public static bool DeleteProduct(int id)
        {
            return Provider.DeleteProduct(id);
        }

        public static ProductModel FindProductById(int id)
        {
            return Provider.FindProductById(id);
        }

        public static IEnumerable<ProductModel> GetAllProducts()
        {
            return Provider.GetAllProducts();
        }
        #endregion
    }
}
