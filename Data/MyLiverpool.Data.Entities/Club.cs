﻿using System.Collections.Generic;

namespace MyLiverpool.Data.Entities
{
    public class Club : IEntity
    {
        public Club()
        {
            Matches = new HashSet<Match>();
            Transfers = new HashSet<Transfer>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string EnglishName { get; set; }

        public string StadiumName { get; set; }

        public int StadiumId { get; set; }

        public virtual Stadium Stadium { get; set; }

        public string Logo { get; set; }

        public virtual ICollection<Match> Matches { get; set; }

        public virtual ICollection<Transfer> Transfers { get; set; }
    }
}