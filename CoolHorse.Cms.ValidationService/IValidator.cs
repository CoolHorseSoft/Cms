namespace CoolHorse.Cms.ValidationService
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;

    public interface IKeyDuplicateValidtor<TModel>
    {
        bool DuplicateValidate(TModel model);
    }

    public interface IUsageValidator<TModel>
    {
        bool UsageValidate(TModel model);
    }
}
