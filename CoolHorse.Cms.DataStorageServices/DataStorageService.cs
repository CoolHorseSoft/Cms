namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using Providers;
    using System.Web.Configuration;

    public static class DataStorageService
    {
        private static IDataStorageProvider _provider = null;
        private static DataStorageProviderCollection _providers;

        /// <summary>
        /// The lock object.
        /// </summary>
        private static readonly object TheLock = new object();

        public static IDataStorageProvider Provider
        {
            get
            {
                LoadProviders();
                return _provider;
            }
        }

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

        #region Private helpers
        private static void LoadProviders()
        {
            // Avoid claiming lock if providers are already loaded
            if (_provider == null)
            {
                lock (TheLock)
                {
                    // Do this again to make sure _provider is still null
                    if (_provider == null)
                    {
                        // Get a reference to the <blogProvider> section
                        var section =(DataStorageProviderSection)WebConfigurationManager.GetSection("CmsServices/dataStorageProvider");

                        // Load registered providers and point _provider
                        // to the default provider
                        _providers = new DataStorageProviderCollection();
                        ProvidersHelper.InstantiateProviders(section.Providers, _providers, typeof(IDataStorageProvider));
                        _provider = _providers[section.DefaultProvider];

                        if (_provider == null)
                        {
                            throw new ProviderException("Unable to load default DataStorageProvider");
                        }
                    }
                }
            }
        }
        #endregion
    }
}
