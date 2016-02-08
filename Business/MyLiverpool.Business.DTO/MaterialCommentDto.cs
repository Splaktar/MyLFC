﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace MyLiverpool.Business.DTO
{
    public class MaterialCommentDto : IDto
    {
        public MaterialCommentDto()
        {
            Children = new HashSet<MaterialCommentDto>();
        }

        public int Id { get; set; }

        //public bool Pending { get; set; }

        public DateTime AdditionTime { get; set; }

        public string AuthorUserName { get; set; }

        public int AuthorId { get; set; }

        [AllowHtml]
        public string Message { get; set; }

        [AllowHtml]
        public string Answer { get; set; }

        public int NewsItemId { get; set; }

        public virtual ICollection<MaterialCommentDto> Children { get; set; }
    }
}