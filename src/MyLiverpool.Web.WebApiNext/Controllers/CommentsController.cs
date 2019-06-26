﻿using System;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyLfc.Application.Comments;
using MyLfc.Common.Web;
using MyLfc.Common.Web.DistributedCache;
using MyLfc.Common.Web.Hubs;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Business.Dto.Filters;
using MyLiverpool.Common.Utilities;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;
using Newtonsoft.Json;

namespace MyLiverpool.Web.WebApiNext.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Controller for manage comments.
    /// </summary>
    public class CommentsController : BaseController
    {
        private readonly ICommentService _commentService;
        private readonly IDistributedCacheManager _cacheManager;
        private readonly ISignalRHubAggregator _signalRHubAggregator;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="commentService"></param>
        /// <param name="cache"></param>
        /// <param name="signalRHubAggregator"></param>
        public CommentsController(ICommentService commentService, IDistributedCacheManager cache, ISignalRHubAggregator signalRHubAggregator)
        {
            _commentService = commentService;
            _cacheManager = cache;
            _signalRHubAggregator = signalRHubAggregator;
        }

        /// <summary>
        /// Returns pageable comments list.
        /// </summary>
        /// <param name="filtersObj">Contains filters.</param>
        /// <returns>Selected page comments list.</returns>
        [Obsolete("Remove after 15 July 19")]
        [AllowAnonymous, HttpGet("{filtersObj}")]
        public async Task<IActionResult> GetListOld([FromRoute] string filtersObj)
        {
            MaterialCommentFiltersDto filters;
            if (filtersObj == null)
            {
                filters = new MaterialCommentFiltersDto { Page = 1 };
            }
            else
            {
                filters = (MaterialCommentFiltersDto)JsonConvert.DeserializeObject(filtersObj, typeof(MaterialCommentFiltersDto));
            }
            GetCommentListQuery.Request request = new GetCommentListQuery.Request()
            {
                OnlyUnverified = filters.OnlyUnverified,
                SortOn = filters.SortBy,
                CurrentPage = filters.Page ?? 1,
                PageSize = filters.ItemsPerPage,
                UserId = filters.UserId,
                SortDirection = filters.SortOrder == SortOrder.Ascending ? "ASC" : "DESC"
                
            };
            var result = await Mediator.Send(request);
            
            return Ok(result);
        }


        /// <summary>
        /// Returns list of filtered materials.  
        /// </summary>
        /// <param name="request">Contains filters.</param>
        /// <returns>List of materials.</returns>
        [AllowAnonymous, HttpGet("")]
        public async Task<IActionResult> GetListItems([FromQuery] GetCommentListQuery.Request request)
        {
            return Ok(await Mediator.Send(request));
        }

        /// <summary>
        /// Returns last comments list.
        /// </summary>
        /// <returns>Last comments list.</returns>
        [AllowAnonymous, HttpGet("last")]
        public async Task<IActionResult> GetLastList()
        {
            var result = await _cacheManager.GetOrCreateAsync(CacheKeysConstants.LastComments,
                async () => await _commentService.GetLastListAsync());
            return Ok(result);
        }

        /// <summary>
        /// Returns pageable comments list for material.
        /// </summary>
        /// <param name="id">The identifier of material.</param>
        /// <param name="page">The page of comments list.</param>
        /// <returns>Selected page comments list for material.</returns>
        [AllowAnonymous, HttpGet("material/{id:int}/list/{page:int}")]
        public async Task<IActionResult> GetListForMaterialAsync(int id, int page = 1)
        {
            if (page < 1)
            {
                page = 1;
            }
            var result = await _commentService.GetListByMaterialIdAsync(id, page);
            return Ok(result);
        }

        /// <summary>
        /// Returns pageable comments list for match.
        /// </summary>
        /// <param name="id">The identifier of match.</param>
        /// <param name="page">The page of comments list.</param>
        /// <returns>Selected page comments list for match.</returns>
        [AllowAnonymous, HttpGet("match/{id:int}/list/{page:int}")]
        public async Task<IActionResult> GetListForMatchAsync(int id, int page = 1)
        {
            if (page < 1)
            {
                page = 1;
            }
            var result = await _commentService.GetListByMatchIdAsync(id, page);
            return Ok(result);
        }

        /// <summary>
        /// Mark comment as verified by moderator.
        /// </summary>
        /// <param name="id">Id of verifiable comment.</param>
        /// <returns>Result of verification.</returns>
        [Authorize(Roles = nameof(RolesEnum.UserStart)), HttpGet("verify/{id:int}")]
        public async Task<IActionResult> VerifyAsync(int id)
        {
            var result = await _commentService.VerifyAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Creates new material comment.
        /// </summary>
        /// <param name="dto">New comment model.</param>
        /// <returns>Result of creation.</returns>
        [Authorize, HttpPost("")]
        public async Task<IActionResult> CreateAsync([FromBody] CommentDto dto)
        {
            dto.IsVerified = IsSiteTeamMember();
            dto.AuthorId = User.GetUserId();
            var result = await _commentService.AddAsync(dto);

            _cacheManager.Remove(CacheKeysConstants.MaterialsLatest,
                CacheKeysConstants.MaterialsPinned, CacheKeysConstants.LastComments);
            result.AuthorUserName = User.Identity.Name;

            var oldMessage = result.Message.Substring(0);
            SanitizeComment(result);

            if (!string.IsNullOrWhiteSpace(result.Message))
            {
                _signalRHubAggregator.Send(HubEndpointConstants.AddComment, result);
            }

            result.Message = oldMessage;

            return Ok(result);
        }

        /// <summary>
        /// Deletes material comment.
        /// </summary>
        /// <param name="id">The identifier of removing comment.</param>
        /// <returns>Result of removing.</returns>
        [Authorize(Roles = nameof(RolesEnum.UserStart)), HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var result = await _commentService.DeleteAsync(id);

            _cacheManager.Remove(CacheKeysConstants.MaterialsLatest, 
                CacheKeysConstants.MaterialsPinned, CacheKeysConstants.LastComments);

            return Ok(result);
        }

        /// <summary>
        /// Updates comment.
        /// </summary>
        /// <param name="id">The identifier of comment.</param>
        /// <param name="dto">Comment.</param>
        /// <returns>Result of update.</returns>
        [Authorize, HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] CommentDto dto)
        {
            if (id != dto.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!User.IsInRole(nameof(RolesEnum.UserStart)) && User.GetUserId() != dto.AuthorId)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }
            dto.IsVerified = IsSiteTeamMember();

            var result = await _commentService.UpdateAsync(dto);
            _cacheManager.Remove(CacheKeysConstants.LastComments);

            return Ok(result);
        }       
        
        /// <summary>
        /// Updates comment vote.
        /// </summary>
        /// <param name="dto">Comment vote.</param>
        /// <returns>Result of update.</returns>
        [Authorize, HttpPut("vote")]
        public async Task<IActionResult> UpdateVoteAsync([FromBody] CommentVoteDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            dto.UserId = User.GetUserId();
            var result = await _commentService.UpdateVoteAsync(dto);

            return Ok(result);
        }

        private bool IsSiteTeamMember()
        {
            return User.Identity.IsAuthenticated
                                 &&(User.IsInRole(nameof(RolesEnum.AdminStart))
                                 || User.IsInRole(nameof(RolesEnum.BlogStart))
                                 || User.IsInRole(nameof(RolesEnum.InfoStart))
                                 || User.IsInRole(nameof(RolesEnum.NewsStart))
                                 || User.IsInRole(nameof(RolesEnum.UserStart)));
        }

        //todo duplicate in commentService 
        private void SanitizeComment(CommentDto comment)
        {
            comment.Message = Regex.Replace(Regex.Replace(comment.Message, "&.*?;", string.Empty), "<.*?>", string.Empty);
            if (comment.Message.Length > GlobalConstants.LastCommentMessageSymbolCount)
            {
                comment.Message = comment.Message.Substring(0, GlobalConstants.LastCommentMessageSymbolCount) +
                                  "...";
            }
        }
    }
}
