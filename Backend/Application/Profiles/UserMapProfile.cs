using Application.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.Profiles
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<UserRegistrationDto, User>()
                .ForMember(dest => dest.HashedPassword, opt => opt.Ignore());

            CreateMap<User, UserDto>();


        }
    }
}
