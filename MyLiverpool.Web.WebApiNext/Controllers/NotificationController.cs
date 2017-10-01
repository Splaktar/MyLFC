﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;

namespace MyLiverpool.Web.WebApiNext.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Manages notifiacations.
    /// </summary>
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme), Route("api/v1/[controller]")]
    public class NotificationController : Controller
    {
        private readonly INotificationService _notificationService;

        /// <summary>
        /// Controller.
        /// </summary>
        /// <param name="notificationService"></param>
        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Returns user notifications.
        /// </summary>
        /// <returns></returns>
        [Authorize, HttpGet("")]
        public async Task<IActionResult> GetListAsync()
        {
            var model = new List<NotificationDto>
            {
                new NotificationDto
                {
                    Type = NotificationType.Matches,
                    Id = 1,
                    TypeName = NotificationType.Matches.ToString(),
                    IsRead = false,
                    EntityId = 22,
                    Text = "Пользователь ОДМЕН ответил на ваш комментарий: здесь ответ начало из пятидесяти символов"
                    
                }
            };//await _notificationService.GetListAsync(User.GetUserId());
            return Json(model);
        }

        /// <summary>
        /// Returns detailed pm.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize, HttpGet("{id:int}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var userId = User.GetUserId();
         //   var model = await _notificationService.GetAsync(id, userId);
            //      _cache.Remove(UserPm + userId);
            return Ok();
        }

        /// <summary>
        /// Creates new private message.
        /// </summary>
        /// <param name="model">Private message model.</param>
        /// <returns>Is created successfully.</returns>
        [Authorize, HttpPost("")]
        public async Task<IActionResult> CreateAsync([FromBody]NotificationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
         //   model.SenderId = User.GetUserId();
       //     if (model.ReceiverId == model.SenderId)
            {
                return BadRequest();
            }
            var result = await _notificationService.CreateAsync(model);
            //   _cache.Remove(UserPm + model.ReceiverId);
            return Ok(result);
        }

        /// <summary>
        /// Returns count of unread notifications.
        /// </summary>
        /// <returns>Count of unread notifications.</returns>
        [Authorize, HttpGet("unread")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var userId = User.GetUserId();
            var result = 0;//await _cache.GetOrCreate(UserPm + userId, async x =>
           //     await _notificationService.GetUnreadCountAsync(userId);//);
            return Json(result);
        }
    }
}
