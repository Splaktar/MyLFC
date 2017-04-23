﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Data.Common;

namespace MyLiverpool.Web.WebApiNext.Controllers
{
    /// <summary>
    /// Manages images.
    /// </summary>
    [Authorize(Roles = nameof(RolesEnum.NewsStart) +"," + nameof(RolesEnum.BlogStart)), Route("api/v1/[controller]")]
    public class ImageController : Controller
    {
        private const string PathContent = "content\\";
        private const string PathImages = "images\\";
        private const string PathFull = "content\\images\\";
        private readonly IHostingEnvironment _env;
        private readonly IUploadService _uploadService;

        private readonly int _pathLength = PathFull.Length + 1;

        /// <summary>
        /// Constructor.
        /// </summary>
        public ImageController(IHostingEnvironment environment, IUploadService uploadService)
        {
            _env = environment;
            _uploadService = uploadService;
        }

        /// <summary>
        /// Returns all folders and files that contains in specified path.
        /// </summary>
        /// <param name="path">Path to show.</param>
        /// <returns>List of folders and files.</returns>
        [HttpGet, Route("")]
        public async Task<IActionResult> Get([FromQuery]string path)
        {
            List<ImageDto> files = new List<ImageDto>();
            if (string.IsNullOrWhiteSpace(path) || path == "undefined")
            {
                path = PathFull;
            }
            if (!path.Contains(PathContent))
            {
                path = Path.Combine(PathFull, path);
            }
            //CHECK ONLY ALLOWED PATHES
            IEnumerable<string> subdirectoryFolders;
            IEnumerable<string> subdirectoryFiles;
            var fullPath = Path.Combine(_env.WebRootPath, path);
            try
            {
                subdirectoryFolders = Directory.EnumerateDirectories(fullPath);
                subdirectoryFiles = Directory.EnumerateFiles(fullPath); //, "*.jpeg,*.jpg,*.png");
            }
            catch (DirectoryNotFoundException)
            {
                fullPath = Path.Combine(_env.ContentRootPath, PathFull);
                subdirectoryFolders = Directory.EnumerateDirectories(fullPath);
                subdirectoryFiles = Directory.EnumerateFiles(fullPath);
            }

            foreach (var entry in subdirectoryFolders)
            {
                files.Add(new ImageDto()
                {
                    Name = entry.Substring(entry.LastIndexOf('\\') + 1),
                    Path = entry.Substring(entry.LastIndexOf(PathFull, StringComparison.OrdinalIgnoreCase)),
                    IsFolder = true
                });
            }
            foreach (var entry in subdirectoryFiles)
            {
                files.Add(new ImageDto()
                {
                    Name = entry.Substring(entry.LastIndexOf('\\') + 1),
                    Path = entry.Substring(entry.LastIndexOf(PathFull, StringComparison.OrdinalIgnoreCase)),
                    IsFolder = false
                });
            }
            return await Task.FromResult(Ok(files));
        }

        /// <summary>
        /// Upload new images.
        /// </summary>
        /// <returns>Result of uploading.</returns>
        [Authorize(Roles = nameof(RolesEnum.NewsStart) + "," + nameof(RolesEnum.BlogStart)), HttpPost("")]
        public async Task<IActionResult> UploadImagesAsync()
        {
            if (Request.Form.Files != null && Request.Form.Files.Count > 0)
            {
                var files = Request.Form.Files;
                var result = await _uploadService.UploadAsync(files);

                return Ok(result);
            }
            return BadRequest();
        }
    }
}
