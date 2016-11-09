﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.DtoNext;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Contracts;

namespace MyLiverpool.Business.Services.Services
{
    public class MaterialCategoryService : IMaterialCategoryService
    {
        private readonly IMaterialCategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public MaterialCategoryService(IMaterialCategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<MaterialCategoryDto>> GetListAsync(MaterialType materialType)
        {
            var categories = await _categoryRepository.GetAsync(x => x.MaterialType == materialType);
            var result = _mapper.Map<ICollection<MaterialCategoryDto>>(categories);
            return result;
        }

        public async Task<MaterialCategoryDto> GetAsync(int id, MaterialType materialType)
        {
            var result = await _categoryRepository.GetByIdAsync(id);
            if (result.MaterialType != materialType)
            {
                return null;
            }
            return _mapper.Map<MaterialCategoryDto>(result);
        }

        public async Task<MaterialCategoryDto> CreateAsync(MaterialCategoryDto dto)
        {
            var model = _mapper.Map<MaterialCategory>(dto);
            _categoryRepository.Add(model);
            await _categoryRepository.SaveChangesAsync();
            var result = _mapper.Map<MaterialCategoryDto>(model);
            return result;
        }

        public async Task<MaterialCategoryDto> UpdateAsync(MaterialCategoryDto dto)
        {
            var model = await _categoryRepository.GetByIdAsync(dto.Id);
            model.Name = dto.Name;
            model.Description = dto.Description;
            _categoryRepository.Update(model);
            await _categoryRepository.SaveChangesAsync();
            var result = _mapper.Map<MaterialCategoryDto>(model);
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category.Materials.Count > 0)
            {
                return false;
            }
            await _categoryRepository.DeleteAsync(id);
            await _categoryRepository.SaveChangesAsync();
            return true;
        }
    }
}
