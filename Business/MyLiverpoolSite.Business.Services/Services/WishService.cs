﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.DTO;
using MyLiverpoolSite.Business.Contracts;
using MyLiverpoolSite.Common.Utilities.Extensions;
using MyLiverpoolSite.Data.DataAccessLayer;
using MyLiverpoolSite.Data.DataAccessLayer.Contracts;
using MyLiverpoolSite.Data.Entities;

namespace MyLiverpoolSite.Business.Services.Services
{
    public class WishService : IWishService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WishService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<WishDto> CreateAsync(WishDto dto)
        {
            var wish = _mapper.Map<Wish>(dto);
            _unitOfWork.WishRepository.Add(wish);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<WishDto>(wish);
        }

        public async Task<PageableData<WishDto>> GetListAsync(int page, int? typeId, string filterText)
        {
            Expression<Func<Wish, bool>> filter = x => true;
            if (typeId.HasValue)
            {
                filter = filter.And(x => (int)x.Type == typeId.Value);
            }
            if (!string.IsNullOrWhiteSpace(filterText) && filterText != "undefined")
            {
                filter = filter.And(x => x.Title.Contains(filterText) || x.Message.Contains(filterText));
            }
            var wishes = await _unitOfWork.WishRepository.GetOrderedByAsync(page, filter : filter, order: SortOrder.Descending, orderBy: x => x.Id);
            var wishesDto = _mapper.Map<IEnumerable<WishDto>>(wishes);
            var wishesCount = await _unitOfWork.WishRepository.GetCountAsync(filter);
            return new PageableData<WishDto>(wishesDto, page, wishesCount);
        }

        public async Task<WishDto> GetAsync(int wishId)
        {
            var wish = await _unitOfWork.WishRepository.GetByIdAsync(wishId);
            return _mapper.Map<WishDto>(wish);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _unitOfWork.WishRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}
