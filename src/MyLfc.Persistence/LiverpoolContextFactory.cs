﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MyLfc.Persistence
{
    public class LiverpoolContextFactory : IDesignTimeDbContextFactory<LiverpoolContext>
    {
        private const string connectionString =
            "Server=.;Database=MyLiverpool11231;Trusted_Connection=True;MultipleActiveResultSets=true";
        public LiverpoolContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<LiverpoolContext>();
            optionsBuilder.UseOpenIddict<int>();
            optionsBuilder.UseSqlServer(connectionString);

            return new LiverpoolContext(optionsBuilder.Options);
        }
    }
}
