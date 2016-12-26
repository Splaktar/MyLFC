﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.DtoNext;
using MyLiverpool.Business.DTO;
using MyLiverpool.Common.Utilities;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Business.Services
{
    public class PmService : IPmService
    {
        private readonly IPmRepository _pmRepository;
        private readonly IMapper _mapper;

        public PmService(IPmRepository pmRepository, IMapper mapper)
        {
            _pmRepository = pmRepository;
            _mapper = mapper;
        }

        public async Task<PrivateMessagesDto> GetListAsync(int id)
        {
            var messages = await _pmRepository.GetAsync(x => x.ReceiverId == id || x.SenderId == id);
            var dto = new PrivateMessagesDto()
            {
                Received = _mapper.Map<ICollection<PrivateMessageMiniDto>>(messages.Where(x => x.ReceiverId == id)),
                Sent = _mapper.Map<ICollection<PrivateMessageMiniDto>>(messages.Where(x => x.SenderId == id))
            };
            return dto;
        }

        public async Task<PrivateMessageDto> GetAsync(int messageId, int userId)
        {
            var message = await _pmRepository.GetByIdAsync(messageId);
            if (message.ReceiverId != userId && message.SenderId != userId)
            {
                throw new UnauthorizedAccessException();
            }
            if (!message.IsRead && message.ReceiverId == userId)
            {
                message.IsRead = true;
                _pmRepository.Update(message);
                await _pmRepository.SaveChangesAsync();
            }
            return _mapper.Map<PrivateMessageDto>(message);
        }

        public async Task<bool> SaveAsync(PrivateMessageDto model)
        {
            await RemoveOldMessages(model.SenderId);
            await RemoveOldMessages(model.ReceiverId);

            var message = _mapper.Map<PrivateMessage>(model);
            message.SentTime = DateTime.Now;
            try
            {
                message = await _pmRepository.AddAsync(message);
                await _pmRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public async Task<int> GetUnreadPmCountAsync(int userId)
        {
             return await _pmRepository.GetCountAsync(x => !x.IsRead && x.ReceiverId == userId);
        }

        private async Task RemoveOldMessages(int userId)
        {
            var countUserMessages = await _pmRepository.GetCountAsync(x => x.ReceiverId == userId || x.SenderId == userId);
            if (countUserMessages > GlobalConstants.PmsPerUser)
            {
                var messages =
                    await
                        _pmRepository.GetAsync(
                            x => x.ReceiverId == userId || x.SenderId == userId);
                var messages2 = messages.Take(GlobalConstants.PmsPerUser / 2).ToList();
                messages2.ForEach(x =>_pmRepository.DeleteAsync(x));
                await _pmRepository.SaveChangesAsync();
            }
        }
    }
}