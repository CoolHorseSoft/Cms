using System.Collections.Generic;

namespace CoolHorse.Cms.BusinessCore
{
    using Models;
    using Utils;

    public abstract class BusinessCoreBase<TModel, TKey> where TModel : ModelBase<TKey>
    {
        public virtual TModel DataModels { get; set; }

        #region Public Methods

        public abstract void SaveChanges(ChangeAction action);

        public abstract IEnumerable<TModel> GetAll();

        #endregion
    }
}
