﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyLiverpool.Data.ResourceAccess.Interfaces
{
    public interface ICrudRepository<TEntity>
    {
        /// <summary>
        /// Returns element by id
        /// </summary>
        Task<TEntity> GetByIdAsync(int id);

        /// <summary>
        /// Adds object to repository.
        /// </summary>
        Task<TEntity> AddAsync(TEntity entity);

        /// <summary>
        /// Deletes object from repository by id.
        /// </summary>
        Task DeleteAsync(int id);

        /// <summary>
        /// Deletes object from repository by entity.
        /// </summary>
        Task DeleteAsync(TEntity entity);

        /// <summary>
        /// Updates object in repository.
        /// </summary>
        void Update(TEntity entity);

        Task SaveChangesAsync();

        Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null);

        Task<IEnumerable<TEntity>> GetListAsync();
    }
}