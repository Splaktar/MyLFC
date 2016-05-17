﻿using AutoMapper;
using MyLiverpool.Business.DTO;
using MyLiverpoolSite.Data.Entities;

namespace MyLiverpool.Common.MapperConfigurations.Profiles
{
    public class PmMapperProfile : Profile
    {
        private readonly IMapperConfiguration _cfg;

        public PmMapperProfile(IMapperConfiguration cfg)
        {
            _cfg = cfg;
        }
        protected override void Configure()
        {
            RegisterPrivateMessageMapping();
        }

        private void RegisterPrivateMessageMapping()
        {
            _cfg.CreateMap<PrivateMessage, PrivateMessageMiniDto>()
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.IsRead, src => src.MapFrom(x => x.IsRead))
                .ForMember(dest => dest.ReceiverId, src => src.MapFrom(x => x.ReceiverId))
                .ForMember(dest => dest.ReceiverUserName, src => src.MapFrom(x => x.Receiver.UserName))
                .ForMember(dest => dest.SenderId, src => src.MapFrom(x => x.SenderId))
                .ForMember(dest => dest.SenderUserName, src => src.MapFrom(x => x.Sender.UserName))
                .ForMember(dest => dest.SentTime, src => src.MapFrom(x => x.SentTime))
                .ForMember(dest => dest.Title, src => src.MapFrom(x => x.Title));

            _cfg.CreateMap<PrivateMessage, PrivateMessageDto>()
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.IsRead, src => src.MapFrom(x => x.IsRead))
                .ForMember(dest => dest.Message, src => src.MapFrom(x => x.Message))
                .ForMember(dest => dest.ReceiverId, src => src.MapFrom(x => x.ReceiverId))
                .ForMember(dest => dest.ReceiverUserName, src => src.MapFrom(x => x.Receiver.UserName))
                .ForMember(dest => dest.SenderId, src => src.MapFrom(x => x.SenderId))
                .ForMember(dest => dest.SenderUserName, src => src.MapFrom(x => x.Sender.UserName))
                .ForMember(dest => dest.SentTime, src => src.MapFrom(x => x.SentTime))
                .ForMember(dest => dest.Title, src => src.MapFrom(x => x.Title));

            _cfg.CreateMap<PrivateMessageDto, PrivateMessage>()
                .ForMember(dest => dest.Id, src => src.Ignore())
                .ForMember(dest => dest.IsRead, src => src.Ignore())
                .ForMember(dest => dest.Message, src => src.MapFrom(x => x.Message))
                .ForMember(dest => dest.ReceiverId, src => src.MapFrom(x => x.ReceiverId))
                .ForMember(dest => dest.Receiver, src => src.Ignore())
                .ForMember(dest => dest.SenderId, src => src.MapFrom(x => x.SenderId))
                .ForMember(dest => dest.Sender, src => src.Ignore())
                .ForMember(dest => dest.SentTime, src => src.Ignore())
                .ForMember(dest => dest.Title, src => src.MapFrom(x => x.Title));
        }
    }
}
