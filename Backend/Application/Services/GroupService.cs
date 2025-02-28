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

        public GroupService(IGroupRepository groupRepository,
            IMapper mapper,
            IValidator<GroupCreateUpdateDto> groupCreateValidator)
        {
            _groupRepository = groupRepository;
            _groupCreateValidator = groupCreateValidator;
            _mapper = mapper;
        }
        public async Task<Guid> CreateGroupAsync(GroupCreateUpdateDto dto)
        {
            await _groupCreateValidator.ValidateAndThrowAsync(dto);

            if (await _groupRepository.FindByName(dto.Name) != null)
                throw new EntryExistsException("Group with such name already exists.");

            if (dto.Parent != null)
                if (await _groupRepository.GetByIdAsync(dto.Parent.Value) == null)
                    throw new NotFoundException("There no group with such id.");

            var group = _mapper.Map<GroupCreateUpdateDto, Group>(dto);

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

            if (dto.Parent != null)
                if (await _groupRepository.GetByIdAsync(dto.Parent.Value) == null)
                    throw new NotFoundException("There no group with such id.");

            _mapper.Map<GroupCreateUpdateDto, Group>(dto, group);

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