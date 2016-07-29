﻿using System.Threading.Tasks;

namespace MyLiverpoolSite.Business.Contracts
{
    public interface IEntityService<T>
    {
        Task<T> CreateAsync(T dto);

        Task<T> UpdateAsync(T dto);

        Task<bool> DeleteAsync(int id);

        Task<T> GetAsync(int id);
    }
}
