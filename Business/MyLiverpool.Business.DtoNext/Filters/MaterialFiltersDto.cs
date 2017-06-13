﻿using MyLiverpool.Data.Common;

namespace MyLiverpool.Business.Dto.Filters
{
    public class MaterialFiltersDto
    {
        public int Page { get; set; } = 1;

        public int? CategoryId { get; set; }

        public string UserName { get; set; }

        public int? UserId { get; set; }

        public bool IsInNewsmakerRole { get; set; }

        public MaterialType MaterialType { get; set; }

        public override string ToString()
        {
            return $"{Page}{CategoryId}{UserName}{UserId}{IsInNewsmakerRole}{MaterialType}";
        }
    }
}