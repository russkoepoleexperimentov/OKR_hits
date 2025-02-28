using Application.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.Profiles
{
    public class GroupMapProfile : Profile
    {
        public GroupMapProfile()
        {
            CreateMap<GroupCreateUpdateDto, Group>();

            CreateMap<Group, GroupDto>();
        }
    }
}
