﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MyLiverpool.Business.Dto;
using MyLiverpool.Business.Dto.Filters;
using MyLiverpool.Common.Utilities;

namespace MyLiverpool.Business.Contracts
{
    public interface IMaterialCommentService
    {
        Task<bool> DeleteAsync(int id);

        Task<MaterialCommentDto> AddAsync(MaterialCommentDto model);

        Task<bool> UpdateAsync(MaterialCommentDto model);
        
        Task<PageableData<MaterialCommentDto>> GetListAsync(MaterialCommentFiltersDto filters);

        Task<PageableData<MaterialCommentDto>> GetListByMaterialIdAsync(int materialId, int page);

        Task<bool> VerifyAsync(int id);

        Task<bool> UpdateVoteAsync(CommentVoteDto dto);

        Task<IEnumerable<MaterialCommentDto>> GetLastListAsync();

        Task<PageableData<MaterialCommentDto>> GetListByMatchIdAsync(int matchId, int page);
    }
}
