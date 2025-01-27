﻿using AutoMapper;
using MyLfc.Application.Wishes;
using MyLfc.Domain;
using MyLiverpool.Common.Utilities.Extensions;

namespace MyLfc.Application.Infrastructure.Profiles
{
    public class WishProfile : Profile
    {
        public WishProfile()
        {
            CreateMap<CreateWishCommand.Request, Wish>();

            CreateMap<UpdateWishCommand.Request, Wish>();

            CreateMap<Wish, GetWishDetailQuery.Response>()
                .ForMember(dest => dest.TypeName, src => src.MapFrom(x => x.Type.GetNameAttribute()))
                .ForMember(dest => dest.StateName, src => src.MapFrom(x => x.State.GetNameAttribute()));
            ;

            CreateMap<Wish, GetWishListQuery.WishListDto>()
                .ForMember(dest => dest.TypeName, src => src.MapFrom(x => x.Type.GetNameAttribute()))
                .ForMember(dest => dest.StateName, src => src.MapFrom(x => x.State.GetNameAttribute()));
        }
    }
}
