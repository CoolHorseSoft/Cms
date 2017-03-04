namespace CoolHorse.Cms.DataStorageServices.Providers
{
    using System;
    using System.Configuration.Provider;

    /// <summary>
    /// A collection of all registered providers.
    /// </summary>
    public class DataStorageProviderCollection : ProviderCollection
    {
        #region Indexers

        /// <summary>
        ///     Gets a provider by its name.
        /// </summary>
        /// <param name="name">The name of the provider.</param>
        public new IDataStorageProvider this[string name]
        {
            get
            {
                return (IDataStorageProvider)base[name];
            }
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Add a provider to the collection.
        /// </summary>
        /// <param name="provider">
        /// The provider.
        /// </param>
        public override void Add(ProviderBase provider)
        {
            if (provider == null)
            {
                throw new ArgumentNullException("provider");
            }

            if (!(provider is IDataStorageProvider))
            {
                throw new ArgumentException("Invalid provider type", "provider");
            }

            base.Add(provider);
        }

        #endregion
    }
}