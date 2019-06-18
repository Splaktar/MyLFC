﻿using AutoMapper;
using MyLiverpool.Business.Dto;
using MyLiverpool.Business.Dto.Seasons;
using MyLiverpool.Data.Entities;

namespace MyLiverpool.Common.Mappings
{
    public class SeasonMapperProfile : Profile
    {
        public SeasonMapperProfile()
        {
            Map();
        }

        private void Map()
        {
            CreateMap<Season, SeasonDto>();
            CreateMap<SeasonDto, Season>();
            CreateMap<Season, SeasonCalendarDto>();
        }
    }
}