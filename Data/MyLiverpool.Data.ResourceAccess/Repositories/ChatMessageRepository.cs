﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MyLiverpool.Data.ResourceAccess.Repositories
{
    public class ChatMessageRepository : IChatMessageRepository
    {
        private readonly LiverpoolContext _context;

        public ChatMessageRepository(LiverpoolContext context)
        {
            _context = context;
        }

        public async Task<ChatMessage> GetByIdAsync(int id)
        {
            return await _context.ChatMessages.Include(x => x.Author).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ChatMessage> AddAsync(ChatMessage entity)
        {
            var addedEntity = await _context.ChatMessages.AddAsync(entity); //maybe I can in future returns with nav props
            return addedEntity.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.ChatMessages.FindAsync(id);
            if (entity == null)
            {
                throw new NullReferenceException("ChatMessage cannot be null.");
            }
            await DeleteAsync(entity);
        }

        public async Task DeleteAsync(ChatMessage entity)
        {
            await Task.FromResult(_context.ChatMessages.Remove(entity));
        }

        public void Update(ChatMessage entity)
        {
            throw new NotImplementedException();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public Task<int> GetCountAsync(Expression<Func<ChatMessage, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ChatMessage>> GetListAsync()
        {
            return await _context.ChatMessages.Include(x => x.Author).OrderByDescending(x => x.AdditionTime).ToListAsync();
        }
    }
}