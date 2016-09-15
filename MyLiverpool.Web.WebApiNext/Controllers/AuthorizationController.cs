﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLiverpool.Data.Entities;
using OpenIddict;

namespace MyLiverpool.Web.WebApiNext.Controllers
{
    [AllowAnonymous]
    public class AuthorizationController : Controller
    {
        //private readonly OpenIddictApplicationManager<OpenIddictApplication<Guid>> _applicationManager;
        private readonly SignInManager<User> _signInManager;
        private readonly OpenIddictUserManager<User> _userManager;

        public AuthorizationController(
         //   OpenIddictApplicationManager<OpenIddictApplication<Guid>> applicationManager,
            SignInManager<User> signInManager,
            OpenIddictUserManager<User> userManager)
        {
         //   _applicationManager = applicationManager;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("~/connect/token")]
        public async Task<IActionResult> Exchange()
        {
            var request = HttpContext.GetOpenIdConnectRequest();

            if (request.IsPasswordGrantType())
            {
                var user =  await _userManager.FindByNameAsync(request.Username);
                if (user == null)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidGrant,
                        ErrorDescription = "The username/password couple is invalid."
                    });
                }


                if (!await _userManager.CheckPasswordAsync(user, request.Password))
                {
                    if (_userManager.SupportsUserLockout)
                    {
                        await _userManager.AccessFailedAsync(user);
                    }

                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidGrant,
                        ErrorDescription = "The username/password couple is invalid."
                    });
                }

                if (_userManager.SupportsUserLockout)
                {
                    await _userManager.ResetAccessFailedCountAsync(user);
                }

                var identity = await _userManager.CreateIdentityAsync(user, request.GetScopes());
              //  var identity = await _userManager.CreateIdentityAsync(user, new List<string>(){ OpenIdConnectConstants.Scopes.Address, OpenIddictConstants.Scopes.Roles});

                // Create a new authentication ticket holding the user identity.
                var ticket = new AuthenticationTicket(
                    new ClaimsPrincipal(identity),
                    new AuthenticationProperties(),
                    OpenIdConnectServerDefaults.AuthenticationScheme);

                ticket.SetResources(request.GetResources());
                ticket.SetScopes(request.GetScopes());
               // ticket.SetScopes(OpenIddictConstants.Scopes.Roles);

                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }

            return BadRequest(new OpenIdConnectResponse
            {
                Error = OpenIdConnectConstants.Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported."
            });
        }

      //  [Authorize, HttpGet, Route("~/connect/authorize")]
       // public async Task<IActionResult> Authorize()
       // {
            // Extract the authorization request from the ASP.NET environment.
            //var request = HttpContext.GetOpenIdConnectRequest();

            // Retrieve the application details from the database.
          //  var application = await _applicationManager.FindByClientIdAsync(request.ClientId);
           // if (application == null)
          //  {
                //return View("Error", new ErrorViewModel
                //{
                //    Error = OpenIdConnectConstants.Errors.InvalidClient,
                //    ErrorDescription = "Details concerning the calling client application cannot be found in the database"
                //});
          //  }

            // Flow the request_id to allow OpenIddict to restore
            // the original authorization request from the cache.
          //  return View(new AuthorizeViewModel
           // {
             //   ApplicationName = application.DisplayName,
            //    RequestId = request.RequestId,
            //    Scope = request.Scope
           // });
      //      return null;
      //  }

    //    [Authorize, HttpPost("~/connect/authorize/accept"), ValidateAntiForgeryToken]
     //   public async Task<IActionResult> Accept()
     //   {
            // Extract the authorization request from the ASP.NET environment.
         //   var request = HttpContext.GetOpenIdConnectRequest();

            // Retrieve the profile of the logged in user.
          //  var user = await _userManager.GetUserAsync(User);
          //  if (user == null)
          //  {
          //      return View("Error", new ErrorViewModel
           //     {
           //         Error = OpenIdConnectConstants.Errors.ServerError,
           //         ErrorDescription = "An internal error has occurred"
           //     });
          //  }

            // Create a new ClaimsIdentity containing the claims that
            // will be used to create an id_token, a token or a code.
          //  var identity = await _userManager.CreateIdentityAsync(user, request.GetScopes());

            // Create a new authentication ticket holding the user identity.
         //   var ticket = new AuthenticationTicket(
         //       new ClaimsPrincipal(identity),
         //       new AuthenticationProperties(),
         //       OpenIdConnectServerDefaults.AuthenticationScheme);

         //   ticket.SetResources(request.GetResources());
         //   ticket.SetScopes(request.GetScopes());

            // Returning a SignInResult will ask OpenIddict to issue the appropriate access/identity tokens.
        //    return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
        //    return null;
      //  }

    //    [Authorize, HttpPost("~/connect/authorize/deny"), ValidateAntiForgeryToken]
   //     public IActionResult Deny()
   //     {
            // Notify OpenIddict that the authorization grant has been denied by the resource owner
            // to redirect the user agent to the client application using the appropriate response_mode.
    //        return Forbid(OpenIdConnectServerDefaults.AuthenticationScheme);
   //     }

        [HttpGet("~/connect/logout")]
        public IActionResult Logout()
        {
            // Extract the authorization request from the ASP.NET environment.
          //  var request = HttpContext.GetOpenIdConnectRequest();

            // Flow the request_id to allow OpenIddict to restore
            // the original logout request from the distributed cache.
         //   return View(new LogoutViewModel
          //  {
         //       RequestId = request.RequestId
         //   });
            return null;
        }

        [HttpPost("~/connect/logout"), ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(CancellationToken cancellationToken)
        {
            // Ask ASP.NET Core Identity to delete the local and external cookies created
            // when the user agent is redirected from the external identity provider
            // after a successful authentication flow (e.g Google or Facebook).
            await _signInManager.SignOutAsync();

            // Returning a SignOutResult will ask OpenIddict to redirect the user agent
            // to the post_logout_redirect_uri specified by the client application.
            return SignOut(OpenIdConnectServerDefaults.AuthenticationScheme);
        }

        // Note: to support the password grant type, you must provide your own token endpoint action:

        // [HttpPost("~/connect/token")]
        // [Produces("application/json")]
        // public async Task<IActionResult> Exchange() {
        //     var request = HttpContext.GetOpenIdConnectRequest();
        // 
        //     if (request.IsPasswordGrantType()) {
        //         var user = await _userManager.FindByNameAsync(request.Username);
        //         if (user == null) {
        //             return BadRequest(new OpenIdConnectResponse {
        //                 Error = OpenIdConnectConstants.Errors.InvalidGrant,
        //                 ErrorDescription = "The username/password couple is invalid."
        //             });
        //         }
        // 
        //         // Ensure the password is valid.
        //         if (!await _userManager.CheckPasswordAsync(user, request.Password)) {
        //             if (_userManager.SupportsUserLockout) {
        //                 await _userManager.AccessFailedAsync(user);
        //             }
        // 
        //             return BadRequest(new OpenIdConnectResponse {
        //                 Error = OpenIdConnectConstants.Errors.InvalidGrant,
        //                 ErrorDescription = "The username/password couple is invalid."
        //             });
        //         }
        // 
        //         if (_userManager.SupportsUserLockout) {
        //             await _userManager.ResetAccessFailedCountAsync(user);
        //         }
        // 
        //         var identity = await _userManager.CreateIdentityAsync(user, request.GetScopes());
        // 
        //         // Create a new authentication ticket holding the user identity.
        //         var ticket = new AuthenticationTicket(
        //             new ClaimsPrincipal(identity),
        //             new AuthenticationProperties(),
        //             OpenIdConnectServerDefaults.AuthenticationScheme);
        // 
        //         ticket.SetResources(request.GetResources());
        //         ticket.SetScopes(request.GetScopes());
        // 
        //         return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
        //     }
        // 
        //     return BadRequest(new OpenIdConnectResponse {
        //         Error = OpenIdConnectConstants.Errors.UnsupportedGrantType,
        //         ErrorDescription = "The specified grant type is not supported."
        //     });
        // }


    }
}