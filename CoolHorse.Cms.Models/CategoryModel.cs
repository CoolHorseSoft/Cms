namespace CoolHorse.Cms.Models
{
    using System;
    using System.Runtime.Serialization;

    [DataContract]
    public class CategoryModel : ModelBase<int>
    {
        #region Properties
        [DataMember]
        public int ParentId { get; set; }

        [DataMember]
        public string Title { get; set; }

        public string Description { get; set; }
        #endregion
    }
}
