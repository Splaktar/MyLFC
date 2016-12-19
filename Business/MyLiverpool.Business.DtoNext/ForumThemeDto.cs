﻿using MyLiverpool.Common.Utilities;

namespace MyLiverpool.Business.DtoNext
{
    public class ForumThemeDto : IDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int SubsectionId { get; set; }

        public int AuthorId { get; set; }

        public string AuthorUserName { get; set; }

        public PageableData<ForumMessageDto> Messages { get;set; }
    }
}
