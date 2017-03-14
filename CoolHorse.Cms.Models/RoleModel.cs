namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class RoleModel : ModelBase<int>
    {
        [DataMember]
        public string RoleName { get; set; }

        [DataMember]
        public string Description { get; set; }
    }
}
