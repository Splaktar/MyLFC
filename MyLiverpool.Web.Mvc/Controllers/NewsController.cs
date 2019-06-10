﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyLfc.Application.Materials;
using MyLfc.Common.Web;
using MyLfc.Common.Web.DistributedCache;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto.Filters;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;

namespace MyLiverpool.Web.Mvc.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Manages blogs.
    /// </summary>
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly IMaterialService _materialService;
        private readonly IDistributedCacheManager _cacheManager;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="materialService"></param>
        /// <param name="cache"></param>
        public NewsController(IMaterialService materialService, IDistributedCacheManager cache)
        {
            _materialService = materialService;
            _cacheManager = cache;
        }

        /// <summary>
        /// Shows blogs lits.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="categoryId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Route("")]
        public async Task<IActionResult> Index(int page = 1, int? categoryId = null, int? userId = null)
        {
            var filters = new MaterialFiltersDto
            {
                Page = page,
                MaterialType = MaterialType.News,
                IsInNewsmakerRole = false,
                CategoryId = categoryId,
                UserId = userId
            };
            var result = await _materialService.GetDtoAllAsync(filters);
            return View("../Materials/Index", result);
        }

        /// <summary>
        /// Returns blog item.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Detail(int id)
        {
            var hasAccess = User != null && (User.IsInRole(nameof(RolesEnum.NewsStart)) || User.IsInRole(nameof(RolesEnum.BlogStart)));
            var model =  await _materialService.GetDtoAsync(id, hasAccess);
            if (model == null)
            {
                return RedirectToAction("Index", "News");
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
                UpdateMaterialCacheAddViewAsync(id);
            }

            return View("../Materials/Detail", model);
        }

        private async void UpdateMaterialCacheAddViewAsync(int materialId)
        {
            var materialCache = await _cacheManager.GetAsync<GetMaterialDetailQuery.Response>(CacheKeysConstants.Material + materialId);
            if (materialCache != null)
            {
                materialCache.Reads++;
                _cacheManager.Set(CacheKeysConstants.Material + materialId, materialCache);
            }

            var materialsCache =
                await _cacheManager.GetAsync<GetLatestMaterialsQuery.Response>(CacheKeysConstants.MaterialsLatest);

            var material = materialsCache?.Results.FirstOrDefault(x => x.Id == materialId);
            if (material != null)
            {
                material.Reads++;
                _cacheManager.Set(CacheKeysConstants.MaterialsLatest, materialsCache);
            }

            var materialsPinnedCache =
                await _cacheManager.GetAsync<GetPinnedMaterialsQuery.Response>(CacheKeysConstants.MaterialsPinned);

            var materialPinned = materialsPinnedCache?.Results.FirstOrDefault(x => x.Id == materialId);
            if (material != null)
            {
                material.Reads++;
                _cacheManager.Set(CacheKeysConstants.MaterialsPinned, materialPinned);
            }
        }
    }
}
