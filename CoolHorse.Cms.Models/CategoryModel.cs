namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class CategoryModel : ModelBase<int>
    {
        #region Properties
        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public string Description { get; set; }
        #endregion
    }
}
