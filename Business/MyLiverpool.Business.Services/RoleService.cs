﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Business.DtoNext;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Business.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleGroupRepository _roleGroupRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public RoleService(IRoleGroupRepository roleGroupRepository, IMapper mapper, IUserRepository userRepository)
        {
            _roleGroupRepository = roleGroupRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<bool> EditRoleGroupAsync(int newRoleGroupId, int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var oldRoleGroup = await _roleGroupRepository.GetByIdAsync(user.RoleGroupId);
            var newRoleGroup = await _roleGroupRepository.GetByIdAsync(newRoleGroupId);

            var rolesToDelete = GetRolesToDelete(oldRoleGroup.RoleGroups.Select(x => x.Role), newRoleGroup.RoleGroups.Select(x => x.Role));
            var rolesToAdd = GetRolesToAdd(oldRoleGroup.RoleGroups.Select(x => x.Role), newRoleGroup.RoleGroups.Select(x => x.Role));

            user.RoleGroupId = newRoleGroupId;
            await _userRepository.RemoveFromRolesAsync(user, rolesToDelete.Select(x => x.Name).ToArray());
            await _userRepository.AddToRolesAsync(user, rolesToAdd.Select(x => x.Name).ToArray());
            
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<IEnumerable<RoleGroupDto>> GetRoleGroupsDtoAsync()
        {
            var roleGroups = await _roleGroupRepository.GetListAsync();
            return _mapper.Map<IEnumerable<RoleGroupDto>>(roleGroups);
        }

        public async Task<string> GetUserRolesAsync(int id)
        {
            var roles = await _userRepository.GetRolesAsync(id);
            return string.Join(", ", roles);
        }

        private IEnumerable<Role> GetRolesToDelete(IEnumerable<Role> oldRoles, IEnumerable<Role> newRoles)
        {
            return oldRoles.Except(newRoles);
        }

        private IEnumerable<Role> GetRolesToAdd(IEnumerable<Role> oldRoles, IEnumerable<Role> newRoles)
        {
            return newRoles.Except(oldRoles);
        }
    }
}