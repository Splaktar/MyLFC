﻿using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;

namespace MyLiverpoolSite.Business.Contracts
{
    public interface IUploadService
    {
        Task<string> UpdateAvatarAsync(int userId, HttpPostedFile file);

        Task<string> UpdateLogoAsync(int? clubId, HttpPostedFile file);

        Task<IEnumerable<string>> UploadAsync(HttpFileCollection files);
    }
}
