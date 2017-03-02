﻿namespace CoolHorse.Cms.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class NewsModel : ModelBase<int>
    {
        #region Properties
        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public int CategoryId { get; set; }

        [DataMember]
        public string Content { get; set; }
        #endregion
    }
}
