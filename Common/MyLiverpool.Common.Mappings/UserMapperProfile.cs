﻿using AutoMapper;
using MyLiverpool.Business.DtoNext;
using MyLiverpool.Business.DTO;
using MyLiverpool.Data.Entities;
using System.Linq;

namespace MyLiverpool.Common.MapperConfigs
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            RegisterUserMapping();
        }
        
        private void RegisterUserMapping()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Birthday, src => src.MapFrom(x => x.Birthday))

                .ForMember(dest => dest.LastModifiedOn, src => src.MapFrom(x => x.LastModified))
                .ForMember(dest => dest.BlogsCount, src => src.MapFrom(x => x.Materials.Count(y => y.Type == MaterialType.Blog)))
                .ForMember(dest => dest.Email, src => src.MapFrom(x => x.Email))
                .ForMember(dest => dest.EmailConfirmed, src => src.MapFrom(x => x.EmailConfirmed))
                .ForMember(dest => dest.FullName, src => src.MapFrom(x => x.FullName))
                .ForMember(dest => dest.Gender, src => src.MapFrom(x => x.Gender))
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.LastModifiedOn, src => src.MapFrom(x => x.LastModified))
                .ForMember(dest => dest.LockoutEndDateUtc, src => src.MapFrom(x => x.LockoutEnd))
                .ForMember(dest => dest.NewsCount, src => src.MapFrom(x => x.Materials.Count(y => y.Type == MaterialType.News)))
                .ForMember(dest => dest.Photo, src => src.MapFrom(x => x.Photo))
                .ForMember(dest => dest.RegistrationDate, src => src.MapFrom(x => x.RegistrationDate))
                .ForMember(dest => dest.RoleGroupName, src => src.MapFrom(x => x.RoleGroup.RussianName))
                .ForMember(dest => dest.RoleGroupId, src => src.MapFrom(x => x.RoleGroupId))
                .ForMember(dest => dest.UserName, src => src.MapFrom(x => x.UserName));

            CreateMap<User, UserMiniDto>()
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.EmailConfirmed, src => src.MapFrom(x => x.EmailConfirmed))
                .ForMember(dest => dest.LastModified, src => src.MapFrom(x => x.LastModified))
                .ForMember(dest => dest.RegistrationDate, src => src.MapFrom(x => x.RegistrationDate))
                .ForMember(dest => dest.RoleGroupName, src => src.MapFrom(x => x.RoleGroup.RussianName))
                .ForMember(dest => dest.Photo, src => src.MapFrom(x => x.Photo))
                .ForMember(dest => dest.UserName, src => src.MapFrom(x => x.UserName));

            CreateMap<RegisterUserDto, User>()
                .ForMember(dest => dest.Birthday, src => src.MapFrom(x => x.Birthday))
                .ForMember(dest => dest.Email, src => src.MapFrom(x => x.Email))
                .ForMember(dest => dest.FullName, src => src.MapFrom(x => x.FullName))
                .ForMember(dest => dest.UserName, src => src.MapFrom(x => x.UserName))
                .ForMember(dest => dest.City, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Country, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Gender, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Homepage, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Ip, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.OldId, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.LastModified, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Photo, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.RegistrationDate, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.RoleGroupId, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.RoleGroup, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Skype, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.Title, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.TwoFactorEnabled, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.AccessFailedCount, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.EmailConfirmed, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.LockoutEnabled, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.LockoutEnd, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.PhoneNumber, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.PhoneNumberConfirmed, src => src.Ignore()) //MapFrom(x => x.))
                .ForMember(dest => dest.SecurityStamp, src => src.Ignore()); //MapFrom(x => x.))
        }
    }
}