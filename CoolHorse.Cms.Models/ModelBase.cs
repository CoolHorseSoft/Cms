namespace CoolHorse.Cms.Models
{
    using System;
    using System.Runtime.Serialization;

    [DataContract]
    public abstract class ModelBase<TKey>
    {
        #region Properties

        [DataMember]
        public TKey Id { get; set; }

        [DataMember]
        public DateTime DateCreated { get; set; }

        [DataMember]
        public DateTime DateUpdated { get; set; }
        #endregion
    }
}
