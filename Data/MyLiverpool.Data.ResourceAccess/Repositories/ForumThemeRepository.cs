﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Data.ResourceAccess.Repositories
{
    public class ForumThemeRepository : IForumThemeRepository
    {
        private readonly LiverpoolContext _context;

        public ForumThemeRepository(LiverpoolContext context)
        {
            _context = context;
        }
        public async Task<ForumTheme> GetByIdAsync(int id)
        {
            return await _context.ForumThemes.FindAsync(id);
        }

        public async Task<ForumTheme> AddAsync(ForumTheme entity)
        {
            var addedEntity = await _context.ForumThemes.AddAsync(entity);
            return addedEntity.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            var ft = await _context.ForumThemes.FindAsync(id);
            if (ft != null)
            {
                await DeleteAsync(ft);
            }
        }

        public async Task DeleteAsync(ForumTheme entity)
        {
            await Task.FromResult(_context.ForumThemes.Remove(entity));
        }

        public void Update(ForumTheme entity)
        {
            _context.ForumThemes.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetCountAsync(Expression<Func<ForumTheme, bool>> filter = null)
        {
            if (filter == null)
            {
                filter = section => true;
            }
            return await _context.ForumThemes.CountAsync(filter);
        }

        public async Task<IEnumerable<ForumTheme>> GetListAsync()
        {
            return await _context.ForumThemes.ToListAsync();
        }

        public async Task<ForumTheme> GetByIdWithMessagesAsync(int id, int page, int itemPerPage = 15)
        {
            return await _context.ForumThemes.Include(y => y.Messages).ThenInclude(m => m.Author).Select(x => new ForumTheme()
            {
                Id = x.Id,
                AuthorId = x.AuthorId,
                Author = x.Author,
                Name = x.Name,
                Description = x.Description,
                Messages = x.Messages.Skip((page - 1) * itemPerPage).Take(itemPerPage)//.Select(y => new ForumMessage()
                //{
                //    Id = y.Id,
                //    OldId = y.OldId,
                //    AdditionTime = y.AdditionTime,
                //    AuthorId = y.AuthorId,
                //    Author = y.Author,
                //    Message = y.Message,
                //    IsFirstMessage = y.IsFirstMessage,
                //    LastModifiedTime = y.LastModifiedTime,
               // })
                .ToList(),
                MessagesCount = x.Messages.Count,
            }).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
