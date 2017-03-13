namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class ProductModel : ModelBase<int>
    {
        #region Properties
        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public CategoryModel Category { get; set; }

        [DataMember]
        public string Content { get; set; }
        #endregion
    }
}
