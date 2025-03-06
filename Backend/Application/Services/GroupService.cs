using Application.Dtos;
using AutoMapper;
using Common;
using Common.Exceptions;
using Domain.Entities;
using Domain.Repositories;
using FluentValidation;

namespace Application.Services
{
    public class GroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IValidator<GroupCreateUpdateDto> _groupCreateValidator;
        private readonly IMapper _mapper;
        private readonly UserService _userService;

        public GroupService(IGroupRepository groupRepository,
            IMapper mapper,
            IValidator<GroupCreateUpdateDto> groupCreateValidator,
            UserService userService)
        {
            _groupRepository = groupRepository;
            _groupCreateValidator = groupCreateValidator;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<List<GroupDto>> GetAllGroupsMappedAsync()
        {
            var groups = await _groupRepository.GetAllAsync();
            return groups.Select(_mapper.Map<Group, GroupDto>).ToList();
        }

        public async Task<GroupDto> GetGroupMappedAsync(Guid id)
        {
            return _mapper.Map<Group, GroupDto>(await GetFromDbAsync(id));
        }

        public async Task<Guid> CreateGroupAsync(GroupCreateUpdateDto dto)
        {
            await _groupCreateValidator.ValidateAndThrowAsync(dto);

            if (await _groupRepository.FindByName(dto.Name) != null)
                throw new EntryExistsException("Group with such name already exists.");

            var group = _mapper.Map<GroupCreateUpdateDto, Group>(dto);

            if (dto.ParentId != null)
            {
                var parent = await GetFromDbAsync(dto.ParentId.Value);

                group.Parent = parent;
            }

            await _groupRepository.AddAsync(group);

            return group.Id;
        }

        public async Task<Guid> GroupEditAsync(Guid? id, GroupCreateUpdateDto dto) 
        {
            if (id == null)
                throw new BadRequestException("Id was null");

            var group = await GetFromDbAsync(id.Value);

            await _groupCreateValidator.ValidateAndThrowAsync(dto);

            if (await _groupRepository.FindByName(dto.Name) != null)
                throw new EntryExistsException("Group with such name already exists.");


            _mapper.Map<GroupCreateUpdateDto, Group>(dto, group);

            if (dto.ParentId != null)
            {
                var parent = await GetFromDbAsync(dto.ParentId.Value);
                group.Parent = parent;
            }

            await _groupRepository.UpdateAsync(group);

            return group.Id;
        }

        public async Task<Guid> GroupDeleteAsync(Guid? id)
        {
            if (id == null)
                throw new BadRequestException("Id was null");

            var group = await GetFromDbAsync(id.Value);

            if (group != null)
            {
                await _groupRepository.DeleteAsync(id.Value);
                return id.Value;
            }
            throw new NotFoundException("There no group with such id.");

        }

        public async Task AttachStudentsToGroupAsync(Guid groupId, List<Guid> usersId)
        {
            var group = await _groupRepository.GetByIdAsync(groupId);

            foreach (var userId in usersId)
            {
                await _userService.AttachUserToGroupAsync(group, userId);
            }
        }

        public async Task<List<UserDto>> GetGroupUsersMappedAsync(Guid id)
        {
            return await _userService.GetUsersByGroupId(id);
        }

        internal async Task<Group> GetFromDbAsync(Guid id)
        {
            var group = await _groupRepository.GetByIdAsync(id);

            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            return group;
        }

    }

}