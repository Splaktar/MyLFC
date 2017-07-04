﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MyLiverpool.Business.Dto;
using MyLiverpool.Common.Utilities;
using MyLiverpool.Data.Common;

namespace MyLiverpool.Business.Contracts
{
    public interface IPersonService
    {
        Task<PersonDto> CreateAsync(PersonDto dto);
        Task<PageableData<PersonDto>> GetListAsync(int page);
        Task<PersonDto> GetByIdAsync(int id);
        Task<PersonDto> UpdateAsync(PersonDto dto);
        Task<bool> DeleteAsync(int id);
        Task<PersonDto> GetBestPlayerAsync();
        Task SetBestPlayerAsync(int personId);
        Task<IEnumerable<PersonDto>> GetStuffListAsync();
        Task<SquadListDto> GetSquadListAsync(PersonType type);
        Task<IEnumerable<KeyValuePair<int, string>>> GetPersonsByNameAsync(string typed);

        Task<IEnumerable<PersonDto>> GetBirthdaysAsync();
    }
}
