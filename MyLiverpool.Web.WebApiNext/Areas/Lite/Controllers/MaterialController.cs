﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto.Filters;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;
using MyLiverpool.Web.WebApiNext.Extensions;

namespace MyLiverpool.Web.WebApiNext.Areas.Lite.Controllers
{

    /// <summary>
    /// Manages materials.
    /// </summary>
    [Area("lite")]
    public class MaterialController : Controller
    {
        private readonly IMaterialService _materialService;
        private readonly IMemoryCache _cache;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="materialService"></param>
        /// <param name="cache"></param>
        public MaterialController(IMaterialService materialService, IMemoryCache cache)
        {
            _materialService = materialService;
            _cache = cache;
        }

        /// <summary>
        /// Material list view.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="categoryId"></param>
        /// <param name="type"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IActionResult> Index(int page = 1, int? categoryId = null, MaterialType type = MaterialType.Both, int? userId = null)
        {
            var filters = new MaterialFiltersDto
            {
                Page = page,
                MaterialType = type,
                IsInNewsmakerRole = false,
                CategoryId = categoryId,
                UserId = userId
            };
            var result = await _materialService.GetDtoAllAsync(filters);
            return View(result);
        }

        /// <summary>
        /// MAterial details.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IActionResult> Detail(int id)
        {
            var hasAccess = User != null && (User.IsInRole(nameof(RolesEnum.NewsStart)) || User.IsInRole(nameof(RolesEnum.BlogStart)));
            var model = await _cache.GetOrCreateAsync(CacheKeysConstants.Material + id, async x => await _materialService.GetDtoAsync(id, hasAccess));
            if (model == null)
            {
                return RedirectToAction("Index", "Material");
            }
            if (model.Pending)
            {
                if ((model.Type == MaterialType.News || User.GetUserId() != model.UserId) &&
                    (User == null || !User.IsInRole(nameof(RolesEnum.NewsStart))))
                {
                    return BadRequest();
                }
            }
            var label = CacheKeysConstants.Material + id;
            if (string.IsNullOrWhiteSpace(Request.Cookies[label]))
            {
                var options = new CookieOptions { Expires = DateTime.Now.AddMonths(1) };
                Response.Cookies.Append(label, "1", options);
                model.Reads++;
                await _materialService.AddViewAsync(id);
                _cache.Remove(CacheKeysConstants.Material + id);
                _cache.Remove(CacheKeysConstants.MaterialList);
            }
            return View(model);
        }
    }
}