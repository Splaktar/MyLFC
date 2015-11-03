﻿using System;
using System.Collections.Generic;
using System.Web.Mvc;
using MyLiverpoolSite.Data.Entities;

namespace MyLiverpoolSite.Business.ViewModels.News
{
    public class IndexNewsViewModel
    {
        public IndexNewsViewModel()
        {
            Comments = new HashSet<NewsComment>();
        }

        public int Id { get; set; }

        public int OldId { get; set; }

        public int CategoryId { get; set; }

        public virtual NewsCategory NewsCategory { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }

        public bool CanCommentary { get; set; }

        public DateTime AdditionTime { get; set; }

        public uint NumberCommentaries { get; set; }

        public virtual User Author { get; set; }

        public string Title { get; set; }

        [AllowHtml]
        public string Brief { get; set; }

        [AllowHtml]
        public string Message { get; set; }

        public int Reads { get; set; }

        public string Source { get; set; }

        public string PhotoPath { get; set; }

        public DateTime LastModified { get; set; }

        public virtual ICollection<NewsComment> Comments { get; set; }
    }
}
