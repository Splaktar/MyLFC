﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyLiverpool.Data.Entities;
using Microsoft.EntityFrameworkCore;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Data.ResourceAccess.Repositories
{
    public class MatchRepository: IMatchRepository
    {
        private readonly LiverpoolContext _context;

        public MatchRepository(LiverpoolContext context)
        {
            _context = context;
        }

        public async Task<Match> GetByIdAsync(int id)
        {
            return await _context.Matches.FindAsync(id);
        }

        public async Task<Match> AddAsync(Match entity)
        {
            var addedEntity = await _context.Matches.AddAsync(entity);
            return addedEntity.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            var pm = await _context.Matches.FindAsync(id);
            if (pm != null)
            {
                await DeleteAsync(pm);
            }
        }

        public async Task DeleteAsync(Match entity)
        {
            await Task.FromResult(_context.Matches.Remove(entity));
        }

        public void Update(Match entity)
        {
            _context.Matches.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetCountAsync(Expression<Func<Match, bool>> filter = null)
        {
            return await _context.Matches.CountAsync();
        }

        public Task<IEnumerable<Match>> GetListAsync()
        {
            throw new NotImplementedException("Not need to implement");
        }

        public async Task<IEnumerable<Match>> GetListAsync(int page, int itemPerPage = 15,
            Expression<Func<Match, bool>> filter = null,
            SortOrder order = SortOrder.Ascending, Expression<Func<Match, object>> orderBy = null)
        {
            IQueryable<Match> query = _context.Matches;

            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (orderBy != null)
            {
                query = query.ObjectSort(orderBy, order);
            }
            query = query.Skip((page - 1) * itemPerPage).Take(itemPerPage);
            return await query.ToListAsync();
        }
    }
}