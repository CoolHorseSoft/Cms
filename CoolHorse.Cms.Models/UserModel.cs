namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;
    using System.Collections.Generic;

    [DataContract]
    public class UserModel : ModelBase<int>
    {
        public UserModel()
        {
            this.RoleGroups = new List<RoleGroupModel>();
            this.Roles = new List<RoleModel>();
        }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public string Password { get; set; }

        [DataMember]
        public IEnumerable<RoleGroupModel> RoleGroups { get; set; }

        [DataMember]
        public IEnumerable<RoleModel> Roles { get; set; }
    }
}
