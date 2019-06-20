﻿using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using MyLfc.Domain;
using MyLfc.Persistence;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;

namespace MyLfc.Application.Materials
{
    public class CreateMaterialCommand
    {
        public class Request : IRequest<Response>
        {
            public int CategoryId { get; set; }
            
            public int UserId { get; set; }

            public string Title { get; set; }

            public string Brief { get; set; }

            public string Message { get; set; }

            public string Source { get; set; }
            
            public string Photo { get; set; }

            public string PhotoPreview { get; set; }

            public bool Pending { get; set; }

            public bool OnTop { get; set; }

            public bool CanCommentary { get; set; }
            
            public MaterialType Type { get; set; }
            
            public bool UsePhotoInBody { get; set; }

            public string Tags { get; set; }                                                       
        }


        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly LiverpoolContext _context;

            private readonly IHttpContextAccessor _contextAccessor;

            private readonly IMapper _mapper;
            
            public Handler(LiverpoolContext context, IHttpContextAccessor contextAccessor, IMapper mapper)
            {
                _context = context;
                _contextAccessor = contextAccessor;
                _mapper = mapper;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var material = _mapper.Map<Material>(request);
                material.AdditionTime = DateTime.Now;
                material.AuthorId = _contextAccessor.HttpContext.User.GetUserId();
                material.LastModified = DateTime.Now;

                _context.Add(material);
                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<Response>(material);
            }
        }

        public class Response
        {
            public int CategoryId { get; set; }

            public int UserId { get; set; }

            public string Title { get; set; }

            public string Brief { get; set; }

            public string Message { get; set; }

            public string Source { get; set; }

            public string Photo { get; set; }

            public string PhotoPreview { get; set; }

            public bool Pending { get; set; }

            public bool OnTop { get; set; }

            public bool CanCommentary { get; set; }

            public MaterialType Type { get; set; }

            public bool UsePhotoInBody { get; set; }

            public string Tags { get; set; }
        }
    }
}
