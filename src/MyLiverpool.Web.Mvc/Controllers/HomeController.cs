﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyLfc.Application.Materials;

namespace MyLiverpool.Web.Mvc.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Home controller.
    /// </summary>
    [AllowAnonymous]
    public class HomeController : BaseController
    {
        public async Task<IActionResult> Index(GetMaterialListQuery.Request request)
        {
            return View(await Mediator.Send(request));
        }

        [HttpGet("About")]
        public IActionResult About()
        {
            return View();
        }

        [HttpGet("Copyright")]
        public IActionResult Copyright()
        {
            return View();
        }

        [HttpGet("ClubHistory")]
        public IActionResult ClubHistory()
        {
            return View();
        }

        [HttpGet("AboutClub")]
        public IActionResult AboutClub()
        {
            return View();
        }

        [HttpGet("Rules")]
        public IActionResult Rules()
        {
            return View();
        }

        [HttpGet("Cooperation")]
        public IActionResult Cooperation()
        {
            return View();
        }
    }
}
