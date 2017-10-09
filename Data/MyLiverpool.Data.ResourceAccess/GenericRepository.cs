﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Data.ResourceAccess
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class, IEntity
    {
        private readonly LiverpoolContext _context;

        public GenericRepository(LiverpoolContext context)
        {
            _context = context;
        }

        public async Task<T> CreateAsync(T entity)
        {
            var entityEntry = await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entityEntry.Entity;
        }

        public async Task<T> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            if (includes != null && includes.Any())
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<T> GetByComplexIdAsync(int id, int id2)
        {
            return await _context.Set<T>().FindAsync(id, id2);//todo include props
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return false;
            }
            return await DeleteAsync(entity);
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.CountAsync();
        }

        public async Task<IEnumerable<T>> GetListAsync(int? page = null, int itemPerPage = 15, Expression<Func<T, bool>> filter = null, SortOrder order = SortOrder.Ascending,
            Expression<Func<T, object>> orderBy = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            if (includes != null && includes.Any())
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (orderBy != null)
            {
                query = query.ObjectSort(orderBy, order);
            }
            if (page.HasValue)
            {
                query = query.Skip((page.Value - 1) * itemPerPage).Take(itemPerPage);
            }
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> filter = null,
            SortOrder order = SortOrder.Ascending, Expression<Func<T, object>> orderBy = null,
            params Expression<Func<T, object>>[] includes)
        {
            return await GetListAsync(null, 0, filter, order, orderBy, includes);
        }

        public async Task<T> GetFirstByFilterAsync(Expression<Func<T, bool>> filter)
        {
            IQueryable<T> query = _context.Set<T>();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.FirstOrDefaultAsync();
        }
    }
}