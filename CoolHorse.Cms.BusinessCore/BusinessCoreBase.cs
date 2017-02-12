namespace CoolHorse.Cms.BusinessCore
{
    using Models;
    using Utils;

    public abstract class BusinessCoreBase<TModel, TKey> where TModel : ModelBase<TKey>
    {
        protected virtual TModel DataModels { get; set; } = null;

        #region Public Methods

        protected abstract void SaveChanges(ChangeAction action);

        #endregion
    }
}
