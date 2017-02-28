﻿using System.Collections.Generic;

namespace CoolHorse.Cms.BusinessCore
{
    using Models;
    using Utils;
    using DataStorageServices;

    public class Category:BusinessCoreBase<CategoryModel, int>
    {
        public override void SaveChanges(ChangeAction action)
        {
            DataStorageService.AddCategory(this.DataModels);
        }

        public override IEnumerable<CategoryModel> GetAll()
        {
            return DataStorageService.GetAllCategories();
        }
    }
}
