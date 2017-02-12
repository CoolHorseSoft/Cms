namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Collections.Concurrent;
    using System.Data;
    using System.Data.SqlClient;

    public interface ISqlServerDbConnector
    {
        string ConnectionString { get; }
        void ExecuteCommand(SqlCommand cmd, IDbTransaction transaction = null);
        void ExecuteCommands(List<SqlCommand> cmds, IDbTransaction transaction = null);
        void ExecuteCommandsAsParallel(List<SqlCommand> cmds, IDbTransaction transaction = null, ParallelOptions options = null);
        void ExecuteCommandsAsParallel(ConcurrentBag<List<SqlCommand>> sqlCommandsList, ParallelOptions options = null);
        bool GetBooleanValue(SqlCommand cmd, IDbTransaction transaction = null);
        int GetIntegerValue(SqlCommand cmd, IDbTransaction transaction = null);
        int GetIntegerValue(SqlParameter parameter);
        short GetShortValue(SqlCommand cmd, IDbTransaction transaction = null);
        double GetDoubleValue(SqlCommand cmd, IDbTransaction transaction = null);
        double GetDoubleValue(SqlParameter parameter);
        string GetStringValue(SqlCommand cmd, IDbTransaction transaction = null);
        string GetStringValue(SqlParameter parameter);
        DateTime GetDateTimeValue(SqlCommand cmd, IDbTransaction transaction = null);
        DateTime GetDateTimeValue(SqlParameter parameter);
        Guid GetGuidValue(SqlCommand cmd, IDbTransaction transaction = null);
        byte GetByteValue(SqlCommand cmd, IDbTransaction transaction = null);
    }
}
