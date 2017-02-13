using System;
using CoolHorse.Cms.BusinessCore;
using CoolHorse.Cms.Models;
using CoolHorse.Cms.Utils;

namespace CoolHorse.Cms.Tests
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Category c = new Category
            {
                DataModels = new CategoryModel
                {
                    Title = "Test",
                    Description = "Test Desc"
                }
            };

            c.SaveChanges(ChangeAction.Add);

            Console.ReadLine();
        }
    }
}
