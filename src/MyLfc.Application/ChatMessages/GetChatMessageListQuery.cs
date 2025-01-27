﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MyLfc.Application.Infrastructure;
using MyLfc.Persistence;
using MyLiverpool.Common.Utilities;
using MyLiverpool.Data.Common;

namespace MyLfc.Application.ChatMessages
{
    public class GetChatMessageListQuery
    {
        public class Request : PagedQueryBase, IRequest<Response>
        {
            public ChatMessageTypeEnum TypeId { get; set; }

            public int LastMessageId { get; set; }
        }


        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly LiverpoolContext _context;
            private readonly IMapper _mapper;

            public Handler(LiverpoolContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var chatMessageQuery = _context.ChatMessages.AsNoTracking();
                chatMessageQuery =
                    chatMessageQuery.Where(x => x.Type == request.TypeId && x.Id > request.LastMessageId);

                chatMessageQuery = chatMessageQuery.OrderByDescending(x => x.AdditionTime);
                chatMessageQuery = chatMessageQuery.Take(GlobalConstants.TakingChatMessagesCount);

                var messages = await chatMessageQuery
                    .ProjectTo<ChatMessageListDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return new Response
                {
                    CurrentPage = 1,
                    PageSize = request.PageSize,
                    Results = messages,
                    RowCount = 50
                };
            }
        }


        [Serializable]
        public class Response : PagedResult<ChatMessageListDto>
        {

        }

        [Serializable]
        public class ChatMessageListDto
        {
            public int Id { get; set; }

            public int AuthorId { get; set; }

            public string UserName { get; set; }

            public string Message { get; set; }

            public DateTimeOffset AdditionTime { get; set; }
            
            public ChatMessageTypeEnum Type { get; set; }
        }
    }
}
