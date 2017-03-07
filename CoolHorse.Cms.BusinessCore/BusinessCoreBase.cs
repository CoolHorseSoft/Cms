namespace CoolHorse.Cms.BusinessCore
{
    using Models;
    using System.Collections.Generic;

    public abstract class BusinessCoreBase<TModel, TKey> where TModel : ModelBase<TKey>
    {
        #region Public Abstract Methods
        public abstract TModel Create(TModel model);

        public abstract TModel Update(TModel model);

        public abstract bool Delete(TKey key);

        public abstract IEnumerable<TModel> GetAll();

        public abstract TModel GetByKey(TKey key);
        #endregion
    }
}
