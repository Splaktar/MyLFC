﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyLiverpool.Data.Entities;

namespace MyLiverpool.Data.ResourceAccess.Interfaces
{
    public interface IPersonRepository : ICrudRepository<Person>
    {
        Task<IEnumerable<Person>> GetListAsync(int page, int itemPerPage = 15,
            Expression<Func<Person, bool>> filter = null,
            SortOrder order = SortOrder.Ascending, Expression<Func<Person, object>> orderBy = null);
    }
}
