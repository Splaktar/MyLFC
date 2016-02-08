﻿using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace MyLiverpool.Business.DTO
{
    public class NewsCommentEditingDto : IDto
    {
        public int Id { get; set; }

        public int AuthorId { get; set; }

        [Required]
        public int NewsItemId { get; set; }

        [Required]
        [AllowHtml]
        public string Message { get; set; }

        [AllowHtml]
        public string Answer { get; set; }

        public int? ParentId { get; set; }
    }
}