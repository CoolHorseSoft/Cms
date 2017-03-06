using System.Linq;

namespace CoolHorse.Cms.ValidationService
{
    using System;

    public class ValidationService
    {
        public static bool Validate<TModel>(TModel model)
        {
            return LoadValidator<TModel>().Validate(model);
        }

        private static IValidator<TModel> LoadValidator<TModel>()
        {
            var validators = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(IValidator<TModel>).IsAssignableFrom(p)).ToList();

            if (validators.Count() == 1)
            {
                return (IValidator<TModel>) Activator.CreateInstance(validators.First());
            }

            throw new NotImplementedException();
        }
    }
}
