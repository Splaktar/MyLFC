﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLiverpoolSite.Business.Contracts
{
    public interface INewsCommentService
    {
        bool AddParentComment(string comment, int newsId, int userId);
    }
}
