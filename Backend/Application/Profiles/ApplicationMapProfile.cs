
using Application.Dtos;
using AutoMapper;
using Common.Enums;
using Domain.Entities;

namespace Application.Profiles
{
    public class ApplicationMapProfile : Profile
    {
        public ApplicationMapProfile() 
        {
            CreateMap<StudentApplication, StudentApplicationDto>();

            CreateMap<StudentApplicationCreateUpdateDto, StudentApplication>()
                .ForMember(x => x.Status, opt => opt.MapFrom((ent, dto) => dto.Status = StudentApplicationStatus.Checking));
        }
    }
}
