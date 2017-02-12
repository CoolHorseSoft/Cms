namespace CoolHorse.Cms.Models
{
    public class CategoryModel : ModelBase<int>
    {
        #region Properties
        public int ParentId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
        #endregion
    }
}
