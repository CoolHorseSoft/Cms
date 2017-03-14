namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;
    using System.Collections.Generic;

    [DataContract]
    public class RoleGroupModel : ModelBase<int>
    {
        [DataMember]
        public string RoleGroupName { get; set; }

        [DataMember]
        public string Description { get; set; }
    }
}
