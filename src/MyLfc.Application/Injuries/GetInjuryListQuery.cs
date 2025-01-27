﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MyLfc.Application.Infrastructure;
using MyLfc.Application.Infrastructure.Extensions;
using MyLfc.Domain;
using MyLfc.Persistence;

namespace MyLfc.Application.Injuries
{
    public class GetInjuryListQuery
    {
        public class Request : PagedQueryBase, IRequest<Response>
        {
            public string Name { get; set; }
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
                var injuries = _context.Injuries.AsNoTracking();

                if (!string.IsNullOrWhiteSpace(request.Name))
                {
                    injuries = injuries.Where(x => x.Description.Contains(request.Name)
                                             || x.Person.FirstRussianName.Contains(request.Name)
                                             || x.Person.LastRussianName.Contains(request.Name));
                }
                if (!string.IsNullOrWhiteSpace(request.SortOn))
                {
                    if (request.SortOn.Contains("PersonName", StringComparison.InvariantCultureIgnoreCase))
                    {
                        if (request.SortDirection.ToLower() == "asc")
                        {
                            injuries = injuries.OrderBy(x => x.Person.LastName);
                        }
                        else
                        {
                            injuries = injuries.OrderByDescending(x => x.Person.LastName);
                        }
                        request.SortOn = null;
                    }
                    else if (request.SortOn.Contains(nameof(Injury.StartTime),
                        StringComparison.InvariantCultureIgnoreCase))
                    {
                        request.SortOn = nameof(Injury.StartTime);
                    }
                    else if (request.SortOn.Contains(nameof(Injury.EndTime),
                        StringComparison.InvariantCultureIgnoreCase))
                    {
                        request.SortOn = nameof(Injury.EndTime);
                    }
                    else if (request.SortOn.Contains(nameof(Injury.Description),
                        StringComparison.InvariantCultureIgnoreCase))
                    {
                        request.SortOn = nameof(Injury.Description);
                    }
                }

                injuries = injuries.OrderByDescending(x => x.Id);
                return await injuries.GetPagedAsync<Response, Injury, InjuryListDto>(request, _mapper);
            }
        }


        [Serializable]
        public class Response : PagedResult<InjuryListDto>
        {
        }


        [Serializable]
        public class InjuryListDto
        {
            public int Id { get; set; }

            public int PersonId { get; set; }

            public string PersonName { get; set; }

            public string PersonPhoto { get; set; }

            public DateTime StartTime { get; set; }

            public DateTime? EndTime { get; set; }

            public string Description { get; set; }
        }
    }
}
