﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MyLiverpool.Business.Dto;
using MyLiverpool.Data.Common;

namespace MyLiverpool.Business.Contracts
{
    public interface IMaterialCategoryService
    {
        Task<ICollection<MaterialCategoryDto>> GetListAsync(MaterialType materialType);

        Task<MaterialCategoryDto> GetAsync(int id);

        Task<MaterialCategoryDto> CreateAsync(MaterialCategoryDto dto);

        Task<MaterialCategoryDto> UpdateAsync(MaterialCategoryDto dto);

        Task<bool> DeleteAsync(int id);
    }
}