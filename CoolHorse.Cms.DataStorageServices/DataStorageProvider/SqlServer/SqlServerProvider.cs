namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System.Configuration.Provider;
    using System.Web.Configuration;

    public partial class SqlServerProvider : ProviderBase,IDataStorageProvider
    {
        private readonly ISqlServerDbConnector _dbConnector;

        public SqlServerProvider()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["Cms"].ConnectionString;
            _dbConnector =  new SqlServerDbConnector(connectionString);
        }
    }
}
