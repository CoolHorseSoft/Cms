namespace CoolHorse.Cms.ValidationService
{
    using CoolHorse.Cms.Models;
    using System.Collections.Generic;

    public interface IValidator<TModel>
    {
        bool Validate(TModel model);
    }
}
