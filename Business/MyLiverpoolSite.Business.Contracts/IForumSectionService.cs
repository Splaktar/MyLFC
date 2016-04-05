﻿using System.Threading.Tasks;
using MyLiverpool.Business.DTO;

namespace MyLiverpoolSite.Business.Contracts
{
    public interface IForumSectionService
    {
        Task<ForumSectionDto> CreateAsync(string name);

        Task<bool> DeleteAsync(int id);

        Task<ForumDto> GetAsync();
    }
}