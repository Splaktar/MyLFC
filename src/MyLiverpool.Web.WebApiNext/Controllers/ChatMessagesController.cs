﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyLfc.Application.ChatMessages;
using MyLfc.Common.Web;
using MyLfc.Common.Web.Hubs;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;
using MyLiverpool.Web.WebApiNext.Extensions;

namespace MyLiverpool.Web.WebApiNext.Controllers
{
    /// <summary>
    /// Manages chat entities.
    /// </summary>
    public class ChatMessagesController : BaseController
    {
        private readonly IChatMessageService _chatMessageService;
        private readonly ISignalRHubAggregator _signalRHub;

        /// <summary>
        /// Controller.
        /// </summary>
        public ChatMessagesController(IChatMessageService chatMessageService, ISignalRHubAggregator signalRHub)
        {
            _chatMessageService = chatMessageService;
            _signalRHub = signalRHub;
        }

        /// <summary>
        /// Adds new chat message.
        /// </summary>
        /// <param name="dto">Message entity</param>
        /// <returns>Result of creation message.</returns>
        [Authorize, HttpPost("")]
        public async Task<IActionResult> CreateAsync([FromBody]ChatMessageDto dto)
        {
            dto.AuthorId = User.GetUserId();
            dto.Ip = HttpContext.GetIp();
            var result = await _chatMessageService.CreateAsync(dto);
            result.Ip = string.Empty;
            CacheManager.Remove(CacheKeysConstants.ChatName + (int)dto.Type);

             _signalRHub.Send(HubEndpointConstants.ChatEndpoint, result);
            return Ok(result);
        }

        /// <summary>
        /// Deletes chat message.
        /// </summary>
        /// <param name="id">Message identifier.</param>
        /// <returns>Result of deleting message.</returns>
        [Authorize(Roles = nameof(RolesEnum.UserStart)), HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _chatMessageService.DeleteAsync(id);

            CacheManager.Remove(CacheKeysConstants.ChatName + (int)ChatMessageTypeEnum.Mini);
            CacheManager.Remove(CacheKeysConstants.ChatName + (int)ChatMessageTypeEnum.All);
            return Ok(result);
        }     
        
        /// <summary>
        /// Returns chat messages list.
        /// </summary>
        /// <returns>Result of creation message.</returns>
        [Obsolete("Remove after 1 Aug 19")]
        [AllowAnonymous, HttpGet("list/{lastMessageId:int}/{typeId:int}")]
        public async Task<IActionResult> GetOldListAsync([FromRoute]GetChatMessageListQuery.Request request)
        {
            GetChatMessageListQuery.Response result;
            if (request.LastMessageId == 0)
            {
                result = await CacheManager.GetOrCreateAsync(
                    CacheKeysConstants.ChatName + request.TypeId,
                    async () => await Mediator.Send(request));
            }
            else
            {
                result = await Mediator.Send(request);
            }
            return Ok(result.Results);
        }  
        
        /// <summary>
        /// Returns chat messages list.
        /// </summary>
        /// <returns>Result of creation message.</returns>
        [AllowAnonymous, HttpGet("")]
        public async Task<IActionResult> GetListAsync([FromQuery]GetChatMessageListQuery.Request request)
        {
            GetChatMessageListQuery.Response result;
            if (request.LastMessageId == 0)
            {
                result = await CacheManager.GetOrCreateAsync(
                    CacheKeysConstants.ChatName + request.TypeId,
                    async () => await Mediator.Send(request));
            }
            else
            {
                result = await Mediator.Send(request);
            }
            return Ok(result);
        }
        
        /// <summary>
        /// Updates club.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="dto">Modified club entity.</param>
        /// <returns>Returns of editing.</returns>
        [Authorize, HttpPut("{id:int}")]
        public async Task<IActionResult> EditAsync(int id, [FromBody]ChatMessageDto dto)
        {
            if (id != dto.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            int? userId = null;
            if (!User.IsInRole(nameof(RolesEnum.UserStart)))
            {
                userId = User.GetUserId();
            }
            var result = await _chatMessageService.UpdateAsync(dto, userId);
            result.Ip = string.Empty;

            _signalRHub.Send(HubEndpointConstants.ChatEndpoint, result);

            CacheManager.Remove(CacheKeysConstants.ChatName + (int)dto.Type);
            return Ok(result);
        }
    }
}
