﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MyLiverpool.Business.DtoNext;
using MyLiverpool.Business.DTO;

namespace MyLiverpool.Business.Contracts
{
    public interface IAccountService
    {
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto);

        Task<bool> ConfirmEmailAsync(int userId, string code);

        Task<bool> ForgotPasswordAsync(string email);

        Task<bool> IsUserNameUniqueAsync(string userName);

        Task<bool> IsEmailUniqueAsync(string email);

        Task<DateTime> GetLockOutEndDateAsync(int userId);

        Task<IdentityResult> RegisterUserAsync(RegisterUserDto model);

        Task<bool> ResendConfirmEmail(string email);

        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);

        Task<IdentityResult> UpdateLastModifiedAsync(int userId);
    }
}