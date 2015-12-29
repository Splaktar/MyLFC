﻿using System.Collections.Generic;
using AutoMapper;
using MyLiverpool.Business.DTO;
using MyLiverpoolSite.Business.ViewModels.BlogComments;
using MyLiverpoolSite.Business.ViewModels.Blogs;
using MyLiverpoolSite.Business.ViewModels.Forum;
using MyLiverpoolSite.Business.ViewModels.News;
using MyLiverpoolSite.Business.ViewModels.NewsCategories;
using MyLiverpoolSite.Business.ViewModels.NewsComments;
using MyLiverpoolSite.Business.ViewModels.Roles;
using MyLiverpoolSite.Business.ViewModels.Users;
using MyLiverpoolSite.Data.Entities;

namespace MyLiverpoolSite.Business.Services.Mapping
{
    public class AutoMapperBindings : Profile
    {
        public new static void Configure()
        {
            RegisterNewsCommentMapping();
            RegisterNewsMapping();

            RegisterUserMapping();
            
        }

        private static void RegisterUserMapping()
        {
            AutoMapper.Mapper.CreateMap<User, UserDto>()
                .ForMember(dest => dest.Birthday, src => src.MapFrom(x => x.Birthday))
                .ForMember(dest => dest.FullName, src => src.MapFrom(x => x.FullName))
                .ForMember(dest => dest.Gender, src => src.MapFrom(x => x.Gender))
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.LockoutEndDateUtc, src => src.MapFrom(x => x.LockoutEndDateUtc))
                .ForMember(dest => dest.RegistrationDate, src => src.MapFrom(x => x.RegistrationDate))
                .ForMember(dest => dest.RoleGroupName, src => src.MapFrom(x => x.RoleGroup.Name));
        }

        private static void RegisterNewsMapping()
        {
#region mapper for VM
            AutoMapper.Mapper.CreateMap<IndexNewsViewModel, NewsItem>();
            AutoMapper.Mapper.CreateMap<IndexBlogVM, BlogItem>();

            AutoMapper.Mapper.CreateMap<NewsItem, IndexNewsViewModel>();
            AutoMapper.Mapper.CreateMap<BlogItem, IndexBlogVM>();

            AutoMapper.Mapper.CreateMap<NewsItem, CreateEditNewsViewModel>();
            AutoMapper.Mapper.CreateMap<CreateEditNewsViewModel, NewsItem>();

            AutoMapper.Mapper.CreateMap<BlogItem, CreateEditBlogVM>();
            AutoMapper.Mapper.CreateMap<CreateEditBlogVM, BlogItem>();

            AutoMapper.Mapper.CreateMap<NewsItem, IndexMiniNewsVM>();
            AutoMapper.Mapper.CreateMap<BlogItem, IndexMiniBlogVM>();
            //  Mapper.CreateMap<IndexMiniNewsVM, NewsItem>();

            AutoMapper.Mapper.CreateMap<NewsComment, IndexNewsCommentVM>();
            AutoMapper.Mapper.CreateMap<BlogComment, IndexBlogCommentVM>();
            //    Mapper.CreateMap<IndexNewsCommentVM, NewsComment>();

            AutoMapper.Mapper.CreateMap<User, UserViewModel>();
            // Mapper.CreateMap<IndexNewsCommentVM, NewsComment>();

            AutoMapper.Mapper.CreateMap<ForumSubsection, ForumSubsectionVM>().ForMember(x => x.Themes, y => y.Ignore());
            AutoMapper.Mapper.CreateMap<ForumTheme, ForumThemeVM>().ForMember(x => x.Messages, y => y.Ignore());
            AutoMapper.Mapper.CreateMap<ForumMessage, ForumMessageVM>();

            AutoMapper.Mapper.CreateMap<NewsCategory, IndexNewsCategoryVM>();

            AutoMapper.Mapper.CreateMap<RoleGroup, RoleGroupVM>();
            AutoMapper.Mapper.CreateMap<RoleGroupVM, RoleGroup>();

            AutoMapper.Mapper.CreateMap<Role, RoleVM>();
            AutoMapper.Mapper.CreateMap<RoleVM, Role>();

            AutoMapper.Mapper.CreateMap<PrivateMessage, PrivateMessageVM>();
            AutoMapper.Mapper.CreateMap<PrivateMessageVM, PrivateMessage>();
#endregion

            Mapper.CreateMap<NewsItem, NewsMiniDto>()
                .ForMember(dest => dest.AdditionTime, src => src.MapFrom(x => x.AdditionTime))
                .ForMember(dest => dest.AuthorId, src => src.MapFrom(x => x.AuthorId))
                .ForMember(dest => dest.AuthorUserName, src => src.MapFrom(x => x.Author.UserName))
                .ForMember(dest => dest.Brief, src => src.MapFrom(x => x.Brief))
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.NewsCategoryId, src => src.MapFrom(x => x.NewsCategoryId))
                .ForMember(dest => dest.NewsCategoryName, src => src.MapFrom(x => x.NewsCategory.Name))
                .ForMember(dest => dest.NumberCommentaries, src => src.MapFrom(x => x.Comments.Count))
                .ForMember(dest => dest.Pending, src => src.MapFrom(x => x.Pending))
                .ForMember(dest => dest.Title, src => src.MapFrom(x => x.Title))
                .ForMember(dest => dest.PhotoPath, src => src.MapFrom(x => x.PhotoPath))
                .ForMember(dest => dest.Reads, src => src.MapFrom(x => x.Reads));

            Mapper.CreateMap<NewsItem, NewsItemDto>()
                .ForMember(dest => dest.AdditionTime, src => src.MapFrom(x => x.AdditionTime))
                .ForMember(dest => dest.AuthorId, src => src.MapFrom(x => x.AuthorId))
                .ForMember(dest => dest.AuthorUserName, src => src.MapFrom(x => x.Author.UserName))
                .ForMember(dest => dest.CanCommentary, src => src.MapFrom(x => x.CanCommentary))
                .ForMember(dest => dest.Comments, src => src.MapFrom(x => AutoMapper.Mapper.Map<ICollection<NewsCommentDto>>(x.Comments)))
                .ForMember(dest => dest.Message, src => src.MapFrom(x => x.Message))
                .ForMember(dest => dest.NewsCategoryId, src => src.MapFrom(x => x.NewsCategoryId))
                .ForMember(dest => dest.NewsCategoryName, src => src.MapFrom(x => x.NewsCategory.Name))
            //    .ForMember(dest => dest.NumberCommentaries, src => src.MapFrom(x => x.NumberCommentaries))
                .ForMember(dest => dest.Pending, src => src.MapFrom(x => x.Pending))
                .ForMember(dest => dest.Reads, src => src.MapFrom(x => x.Reads))
                .ForMember(dest => dest.Source, src => src.MapFrom(x => x.Source))
                .ForMember(dest => dest.Title, src => src.MapFrom(x => x.Title));

                

        }

        private static void RegisterNewsCommentMapping()
        {
            Mapper.CreateMap<NewsComment, NewsCommentDto>()
                .ForMember(dest => dest.AdditionTime, src => src.MapFrom(x => x.AdditionTime))
                .ForMember(dest => dest.Answer, src => src.MapFrom(x => x.Answer))
                .ForMember(dest => dest.AuthorId, src => src.MapFrom(x => x.AuthorId))
                .ForMember(dest => dest.AuthorUserName, src => src.MapFrom(x => x.Author.UserName))
                .ForMember(dest => dest.Children, src => src.MapFrom(x => x.Children))
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.Message, src => src.MapFrom(x => x.Message));
        }
    }
}
