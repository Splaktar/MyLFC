﻿using System;
using System.Collections.Generic;

namespace MyLiverpool.Business.DTO
{
    public class MaterialDto : IDto
    {
        public MaterialDto()
        {
            this.Comments = new HashSet<MaterialCommentDto>();
        }

        public int Id { get; set; }

        public int CategoryId { get; set; }
      
        public string CategoryName { get; set; }

        public DateTime? AdditionTime { get; set; }

        public int CommentsCount { get; set; }

        public int AuthorId { get; set; }

        public string AuthorUserName { get; set; }

        public string Title { get; set; }

       // [AllowHtml]
        public string Brief { get; set; }

       // [AllowHtml]
        public string Message { get; set; }

        public int Reads { get; set; }

        public string Source { get; set; }

        public string PhotoPath { get; set; }

        public virtual ICollection<MaterialCommentDto> Comments { get; set; }

        public bool Pending { get; set; }

        public bool OnTop { get; set; }

        public bool CanCommentary { get; set; }
    }
}