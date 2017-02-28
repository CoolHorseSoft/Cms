namespace CoolHorse.Cms.DataStorageServices
{
    using Models;
    using System.Collections.Generic;
    using System.Configuration.Provider;
    using Providers;
    using System.Web.Configuration;

    public static partial class DataStorageService
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
                        var section = (DataStorageProviderSection)WebConfigurationManager.GetSection("CmsServices/dataStorageProvider");

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
