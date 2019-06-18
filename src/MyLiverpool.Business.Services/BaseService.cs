﻿using AutoMapper;

namespace MyLiverpool.Business.Services
{
    public class BaseService
    {
        protected readonly IMapper _mapper;

        public BaseService(IMapper mapper)
        {
            _mapper = mapper;
        }
    }
}