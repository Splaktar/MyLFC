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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MaterialCategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ICollection<MaterialCategoryDto>> GetListAsync(MaterialType materialType)
        {
            var categories = await _unitOfWork.MaterialCategoryRepository.GetAsync(x => x.MaterialType == materialType);
            var result = _mapper.Map<ICollection<MaterialCategoryDto>>(categories);
            return result;
        }

        public async Task<MaterialCategoryDto> GetAsync(int id, MaterialType materialType)
        {
            var result = await _unitOfWork.MaterialCategoryRepository.GetByIdAsync(id);
            if (result.MaterialType != materialType)
            {
                return null;
            }
            return _mapper.Map<MaterialCategoryDto>(result);
        }

        public async Task<MaterialCategoryDto> CreateAsync(MaterialCategoryDto dto)
        {
            var model = _mapper.Map<MaterialCategory>(dto);
            _unitOfWork.MaterialCategoryRepository.Add(model);
            await _unitOfWork.SaveAsync();
            var result = _mapper.Map<MaterialCategoryDto>(model);
            return result;
        }

        public async Task<MaterialCategoryDto> UpdateAsync(MaterialCategoryDto dto)
        {
            var model = await _unitOfWork.MaterialCategoryRepository.GetByIdAsync(dto.Id);
            model.Name = dto.Name;
            model.Description = dto.Description;
            _unitOfWork.MaterialCategoryRepository.Update(model);
            await _unitOfWork.SaveAsync();
            var result = _mapper.Map<MaterialCategoryDto>(model);
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _unitOfWork.MaterialCategoryRepository.GetByIdAsync(id);
            if (category.Materials.Count > 0)
            {
                return false;
            }
            await _unitOfWork.MaterialCategoryRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}