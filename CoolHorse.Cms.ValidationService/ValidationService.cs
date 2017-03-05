namespace CoolHorse.Cms.ValidationService
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Reflection;

    public class ValidationService
    {
        public static bool Validate<TModel>(TModel model)
        {
            return LoadValidator<TModel>().Validate(model);
        }

        private static IValidator<TModel> LoadValidator<TModel>()
        {
            Type openType = typeof(IValidator<TModel>);

            IValidator<TModel> a = (IValidator<TModel>)new CategoryValidator();

            Type closeType = openType.MakeGenericType(typeof(TModel));

            var validator = (IValidator<TModel>)Activator.CreateInstance(openType);

            return validator;
        }
    }
}
