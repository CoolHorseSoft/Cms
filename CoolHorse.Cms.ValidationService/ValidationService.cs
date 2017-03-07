using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using System;

    public class ValidationService
    {
        public static bool DuplicateValidate<TModel>(TModel model)
        {
            return LoadDuplicateValidator<TModel>().DuplicateValidate(model);
        }

        public static bool UsageValiate<TModel>(TModel model)
        {
            return LoadUsageValidator<TModel>().UsageValidate(model);
        }

        private static IKeyDuplicateValidtor<TModel> LoadDuplicateValidator<TModel>()
        {
            var validators = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(IKeyDuplicateValidtor<TModel>).IsAssignableFrom(p)).ToList();

            if (validators.Count() == 1)
            {
                return (IKeyDuplicateValidtor<TModel>)Activator.CreateInstance(validators.First());
            }

            throw new NotImplementedException();
        }

        private static IUsageValidator<TModel> LoadUsageValidator<TModel>()
        {
            var validators = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(IUsageValidator<TModel>).IsAssignableFrom(p)).ToList();

            if (validators.Count() == 1)
            {
                return (IUsageValidator<TModel>)Activator.CreateInstance(validators.First());
            }

            throw new NotImplementedException();
        }
    }
}
