namespace CoolHorse.Cms.Models
{
    using System;

    public abstract class ModelBase<TKey>
    {
        #region Properties
        public TKey Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }
        #endregion
    }
}
