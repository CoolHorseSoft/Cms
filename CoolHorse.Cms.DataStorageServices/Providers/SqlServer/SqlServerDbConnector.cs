namespace CoolHorse.Cms.DataStorageServices.Providers.SqlServer
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Threading.Tasks;

    public class SqlServerDbConnector : ISqlServerDbConnector
    {
        public SqlServerDbConnector(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public string ConnectionString { get; private set; }

        private SqlConnection CreateConnection()
        {
            return new SqlConnection(ConnectionString);
        }

        public void ExecuteCommand(SqlCommand cmd, IDbTransaction transaction = null)
        {
            if (transaction == null)
            {
                using (SqlConnection cn = CreateConnection())
                {
                    cn.Open();
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    return;
                }
            }

            SetTransaction(cmd, transaction);
            cmd.ExecuteNonQuery();
        }

        public void ExecuteCommands(List<SqlCommand> cmds, IDbTransaction transaction = null)
        {
            if (cmds == null)
            {
                throw new ArgumentNullException(nameof(cmds));
            }

            if (cmds.Count < 1)
            {
                return;
            }

            if (transaction == null)
            {
                using (SqlConnection cn = CreateConnection())
                {
                    cn.Open();

                    foreach (SqlCommand cmd in cmds)
                    {
                        cmd.Connection = cn;
                        cmd.ExecuteNonQuery();
                    }
                }

                return;
            }

            foreach (SqlCommand cmd in cmds)
            {
                SetTransaction(cmd, transaction);
                cmd.ExecuteNonQuery();
            }
        }

        public void ExecuteCommandsAsParallel(List<SqlCommand> cmds, IDbTransaction transaction = null, ParallelOptions options = null)
        {
            if (cmds == null) throw new ArgumentNullException(nameof(cmds));
            if (cmds.Count == 0) return;

            if (transaction == null)
            {
                //MaxDegreeOfParallelism to 1000 is too big, we need to change
                //Also this can't really make it work that way as it's limitted by SQL connection
                //Above comment added during IR32703 research
                if (options == null)
                {
                    options = new ParallelOptions()
                    {
                        MaxDegreeOfParallelism = 1000
                    };
                }

                Parallel.ForEach(cmds, options, cmd =>
                                             {
                                                 using (SqlConnection cn = CreateConnection())
                                                 {
                                                     cn.Open();
                                                     cmd.Connection = cn;
                                                     cmd.ExecuteNonQuery();
                                                 }
                                             });
                return;
            }

            throw new NotSupportedException("Execute Command As Parallel with a Transaction.");
        }


        public void ExecuteCommandsAsParallel(ConcurrentBag<List<SqlCommand>> sqlCommandsList, ParallelOptions options = null)
        {
            if (sqlCommandsList == null) throw new ArgumentNullException(nameof(sqlCommandsList));
            if (sqlCommandsList.Count == 0) return;

            //MaxDegreeOfParallelism to 1000 is too big, we need to change
            //Also this can't really make it work that way as it's limitted by SQL connection pool
            //Above comment added during IR32703 research
            if (options == null)
            {
                options = new ParallelOptions()
                {
                    MaxDegreeOfParallelism = 1000
                };
            }

            Parallel.ForEach(sqlCommandsList, options, sqlCommandList => Parallel.ForEach(sqlCommandList, options, sqlCommand =>
                {
                    using (SqlConnection cn = CreateConnection())
                    {
                        cn.Open();
                        sqlCommand.Connection = cn;
                        sqlCommand.ExecuteNonQuery();
                    }
                }));
        }


        public byte GetByteValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? (byte)0 : Convert.ToByte(result);
        }

        public bool GetBooleanValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return !Convert.IsDBNull(result) && Convert.ToBoolean(result);
        }

        public bool GetBooleanValue(SqlParameter parameter)
        {
            object result = parameter.Value;
            return !Convert.IsDBNull(result) && Convert.ToBoolean(result);
        }

        public short GetShortValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? (short)0 : Convert.ToInt16(result);
        }

        public int GetIntegerValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? 0 : Convert.ToInt32(result);
        }

        public int GetIntegerValue(SqlParameter parameter)
        {
            object result = parameter.Value;
            return Convert.IsDBNull(result) ? 0 : Convert.ToInt32(result);
        }

        public double GetDoubleValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? 0 : Convert.ToDouble(result);
        }

        public double GetDoubleValue(SqlParameter parameter)
        {
            object result = parameter.Value;
            return Convert.IsDBNull(result) ? 0 : Convert.ToDouble(result);
        }

        public DateTime GetDateTimeValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? DateTime.MinValue : Convert.ToDateTime(result);
        }

        public DateTime GetDateTimeValue(SqlParameter parameter)
        {
            object result = parameter.Value;
            return Convert.IsDBNull(result) ? DateTime.MinValue : Convert.ToDateTime(result);
        }

        public string GetStringValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object result = GetValue(cmd, transaction);
            return Convert.IsDBNull(result) ? null : Convert.ToString(result);
        }

        public string GetStringValue(SqlParameter parameter)
        {
            object result = parameter.Value;
            return Convert.IsDBNull(result) ? null : Convert.ToString(result);
        }

        public Guid GetGuidValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            object value = GetValue(cmd, transaction);
            if (value is Guid) return (Guid)value;

            Guid result = Guid.Empty;

            if (value == null || Convert.IsDBNull(value)) return result;

            Guid.TryParse(Convert.ToString(value), out result);
            return result;
        }

        private object GetValue(SqlCommand cmd, IDbTransaction transaction = null)
        {
            if (transaction == null)
            {
                using (SqlConnection cn = CreateConnection())
                {
                    cn.Open();
                    cmd.Connection = cn;

                    return cmd.ExecuteScalar();
                }
            }

            SetTransaction(cmd, transaction);
            return cmd.ExecuteScalar();
        }

        private void SetTransaction(SqlCommand cmd, IDbTransaction transaction)
        {
            cmd.Transaction = (SqlTransaction)transaction;
            cmd.Connection = (SqlConnection)transaction.Connection;
        }
    }
}
