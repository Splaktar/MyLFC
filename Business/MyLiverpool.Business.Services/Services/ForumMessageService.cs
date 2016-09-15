﻿using System;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.DTO;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Contracts;

namespace MyLiverpool.Business.Services.Services
{
    public class ForumMessageService : IForumMessageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ForumMessageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ForumMessageDto> CreateAsync(ForumMessageDto dto)
        {
            var model = _mapper.Map<ForumMessage>(dto);
            model.AdditionTime = DateTime.Now;
            model.LastModifiedTime = DateTime.Now;
            _unitOfWork.ForumMessageRepository.Add(model);
            await _unitOfWork.SaveAsync();
            return _mapper.Map<ForumMessageDto>(model);
        }
    }
}