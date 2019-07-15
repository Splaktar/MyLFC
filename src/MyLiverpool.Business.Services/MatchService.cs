﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MyLfc.Application.Clubs;
using MyLfc.Domain;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Data.Common;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Business.Services
{
    public class MatchService : IMatchService
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Match> _matchRepository;
        private readonly IMediator _mediator;

        public MatchService(IGenericRepository<Match> matchRepository, IMapper mapper,
            ICommentService commentService, IMediator mediator)
        {
            _commentService = commentService;
            _mediator = mediator;
            _mapper = mapper;
            _matchRepository = matchRepository;
        }

        public async Task<MatchDto> CreateAsync(MatchDto dto)
        {
            var match = _mapper.Map<Match>(dto);
            match = await _matchRepository.CreateAsync(match);
            dto = _mapper.Map<MatchDto>(match);
            return dto;
        }

        public async Task<MatchDto> UpdateAsync(MatchDto dto)
        {
            var match = await _matchRepository.GetFirstByPredicateAsync(x => x.Id == dto.Id);
            match.DateTime = dto.DateTime;//todo think about it use automapper?
            match.IsHome = dto.IsHome;
            match.MatchType = (MatchTypeEnum)dto.TypeId;
            match.ClubId = dto.ClubId;
            match.Club = null;
            match.ReportUrl = dto.ReportUrl;
            match.PhotoUrl = dto.PhotoUrl;
            match.VideoUrl = dto.VideoUrl;
            match.Stadium = null;
            match.StadiumId = dto.StadiumId;
            match.SeasonId = dto.SeasonId;
            match.PreviewId = dto.PreviewId;
            match.ReportId = dto.ReportId;
            await _matchRepository.UpdateAsync(match);
            return dto;
        }

        public async Task<IEnumerable<MatchDto>> GetForCalendarAsync()
        {
            var liverpoolClub = await _mediator.Send(new GetLiverpoolClubQuery.Request());
            if (liverpoolClub == null)
            {
                return null;
            }
            var lastMatch = await GetLastMatchAsync();
            var nextMatch = await GetNextMatchAsync();
            var dtos = new List<MatchDto>();
            var matches = new List<Match>();
            if (lastMatch != null)
            {
                matches.Add(lastMatch);
            }
            if (nextMatch != null)
            {
                matches.Add(nextMatch);
            }
            foreach (var match in matches)
            {
                var dto = _mapper.Map<MatchDto>(match);
                if (match.IsHome)
                {
                    FillClubsFields(dto, liverpoolClub, match.Club);
                }
                else
                {
                    FillClubsFields(dto, match.Club, liverpoolClub);
                }
                dto.Events = new List<MatchEventDto>(); //made events null because they don't need at UI calendar. Maybe create dto for match calendar only
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _matchRepository.DeleteAsync(x => x.Id == id);
            return true;
        }

        public async Task<MatchDto> GetByIdAsync(int id)
        {
            var liverpoolClub = await _mediator.Send(new GetLiverpoolClubQuery.Request());
            if (liverpoolClub == null)
            {
                return null;
            }
            var match = await _matchRepository.GetQueryableList(filter: x => x.Id == id, asNoTracking: true, 
                include: x => x.Include(m => m.Club)
                .Include(m => m.Stadium)
                .Include(m => m.Events).ThenInclude(m => m.Person))
                .FirstOrDefaultAsync();
            if (match == null)
            {
                return null;
            }
            var dto = _mapper.Map<MatchDto>(match);
            if (match.IsHome)
            {
                FillClubsFields(dto, liverpoolClub, match.Club);
            }
            else
            {
                FillClubsFields(dto, match.Club, liverpoolClub);
            }
            dto.CommentCount = await _commentService.CountAsync(x => x.MatchId == dto.Id);

            return dto;
        }


        private static void FillClubsFields(MatchDto dto, Club homeClub, Club awayClub)
        {
            dto.HomeClubId = homeClub.Id;
            dto.HomeClubName = homeClub.Name;
            dto.HomeClubLogo = homeClub.Logo;
            dto.AwayClubId = awayClub.Id;
            dto.AwayClubName = awayClub.Name;
            dto.AwayClubLogo = awayClub.Logo;
        }

        private async Task<Match> GetLastMatchAsync()
        {
            return await _matchRepository
                .GetQueryableList(order: SortOrder.Ascending,
                    orderBy: m => m.DateTime,
                    include: x => x.Include(m => m.Club).Include(m => m.Events))
                .LastOrDefaultAsync(m => m.DateTime <= DateTimeOffset.Now.AddHours(0.5));
        }

        private async Task<Match> GetNextMatchAsync()
        {
            return await _matchRepository
                .GetQueryableList(order: SortOrder.Ascending,
                    orderBy: m => m.DateTime,
                    include: x=> x.Include(m => m.Club)
                        .Include(m => m.Stadium)
                        .Include(m => m.Events))
                .FirstOrDefaultAsync(m => m.DateTime >= DateTimeOffset.Now.AddHours(0.5));
        }
    }
}
