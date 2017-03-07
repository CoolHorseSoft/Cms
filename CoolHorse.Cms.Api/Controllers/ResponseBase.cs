namespace CoolHorse.Cms.Api.Controllers
{
    using System.Runtime.Serialization;


    [DataContract]
    public class ServiceResponse
    {
        [DataMember]
        public string ErrorMessage { get; set; }

        [DataMember]
        public object Response { get; set; }
    }
}