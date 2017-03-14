using System.Collections.Generic;

namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class RoleGroupModel : ModelBase<int>
    {
        public RoleGroupModel()
        {
            this.Roles = new List<RoleModel>();
        }

        [DataMember]
        public string RoleGroupName { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public IEnumerable<RoleModel> Roles { get; set; }
    }
}
