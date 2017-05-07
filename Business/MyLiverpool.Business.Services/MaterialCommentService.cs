﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.Dto;
using MyLiverpool.Business.Dto.Filters;
using MyLiverpool.Common.Utilities;
using MyLiverpool.Common.Utilities.Extensions;
using MyLiverpool.Data.Common;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Business.Services
{
    public class MaterialCommentService : IMaterialCommentService
    {
        private readonly IMaterialCommentRepository _commentService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        private const int ItemPerPage = GlobalConstants.CommentsPerPageList;

        public MaterialCommentService(IMapper mapper, IMaterialCommentRepository commentService, IUserService userService)
        {
            _mapper = mapper;
            _commentService = commentService;
            _userService = userService;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var comment = await _commentService.GetByIdAsync(id);
            if (comment.Children.Any())
            {
                foreach (var item in comment.Children)
                {
                    item.Parent = comment.Parent;
                }
                comment.Children.ToList().ForEach(x => _commentService.Update(x));
            }
            await _commentService.DeleteAsync(id);
            await _commentService.SaveChangesAsync();
            return true;
        }

        public async Task<MaterialCommentDto> AddAsync(MaterialCommentDto model, MaterialType materialType)
        {
            var comment = _mapper.Map<MaterialComment>(model);
            comment.MaterialType = materialType;
            comment.AdditionTime = DateTime.Now;
            comment.LastModified = DateTime.Now;
            comment.IsVerified = false;
            try
            {
                comment = await _commentService.AddAsync(comment);
                await _commentService.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new Exception();
            }
            var result = _mapper.Map<MaterialCommentDto>(comment);
            result.AuthorUserName = await _userService.GetUsernameAsync(comment.AuthorId);
            result.Photo = await _userService.GetPhotoPathAsync(comment.AuthorId);
            return result;
        }

        public async Task<bool> UpdateAsync(MaterialCommentDto model)
        {
            var comment = await _commentService.GetByIdAsync(model.Id);
            comment.LastModified = DateTime.Now;
            comment.Answer = model.Answer;
            comment.Message = model.Message;
            comment.IsVerified = false;
            try
            {
                _commentService.Update(comment);
                await _commentService.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<PageableData<MaterialCommentDto>> GetListAsync(MaterialCommentFiltersDto filters)
        {
            Expression<Func<MaterialComment, bool>> filter = x => true;
            if (filters.OnlyUnverified)
            {
                filter = filter.And(x => !x.IsVerified);
            }
            var comments = await _commentService.GetOrderedByAsync(filters.Page, ItemPerPage, filter, SortOrder.Descending, m => m.AdditionTime);
            var commentDtos = _mapper.Map<IEnumerable<MaterialCommentDto>>(comments);
            var commentsCount = await _commentService.GetCountAsync(filter);
            return new PageableData<MaterialCommentDto>(commentDtos, filters.Page, commentsCount);
        }

        public async Task<PageableData<MaterialCommentDto>> GetListByMaterialIdAsync(int materialId, int page)
        {
            Expression<Func<MaterialComment, bool>> filter = x => x.MaterialId == materialId;// && x.ParentId == null;

            var comments = await _commentService.GetOrderedByAsync(page, ItemPerPage, filter, SortOrder.Ascending, m => m.AdditionTime);//bug need to analize how get all comments for material page but count only top-level for paging
            var unitedComments = UniteComments(comments, page);
            var commentDtos = _mapper.Map<IEnumerable<MaterialCommentDto>>(unitedComments);
            var commentsCount = await _commentService.GetCountAsync(filter);
            return new PageableData<MaterialCommentDto>(commentDtos, page, commentsCount);
        }

        public async Task<bool> VerifyAsync(int id)
        {
            var comment = await _commentService.GetByIdAsync(id);
            comment.IsVerified = true;
            comment.LastModified = DateTime.Now;
            _commentService.Update(comment);
            await _commentService.SaveChangesAsync();
            return true;
        }

        private static IEnumerable<MaterialComment> UniteComments(ICollection<MaterialComment> comments, int page)
        {
            var startNumber = ItemPerPage * (page - 1) + 1;
            foreach (var comment in comments)
            {
                comment.Number = startNumber++;
                if (comment.ParentId == null)
                {
                    continue;
                }
                var parent = comments.FirstOrDefault(c => c.OldId == comment.OldParentId);
                if (parent != null)
                {
                    if (parent.Children == null)
                    {
                        parent.Children = new List<MaterialComment>();
                    }
                    parent.Children.Add(comment);
                }
            }
            return comments.Where(c => c.ParentId == null);
        }
    }
}
