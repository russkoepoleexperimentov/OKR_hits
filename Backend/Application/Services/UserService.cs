using Application.Dtos;
using AutoMapper;
using Common;
using Common.Enums;
using Common.Exceptions;
using Domain.Entities;
using Domain.Repositories;
using FluentValidation;

namespace Application.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ApplicationService _applicationService;
        private readonly IValidator<UserRegistrationDto> _registrationValidator;
        private readonly IValidator<UserUpdateDto> _updateValidator;
        private readonly IMapper _mapper;
        private readonly JWTService _jwtService;

        public UserService(IUserRepository userRepository,
            IMapper mapper,
            IValidator<UserRegistrationDto> registrationValidator,
            IValidator<UserUpdateDto> updateValidator,
            JWTService jwtService,
            ApplicationService applicationService)
        {
            _userRepository = userRepository;
            _registrationValidator = registrationValidator;
            _updateValidator = updateValidator;
            _mapper = mapper;
            _jwtService = jwtService;
            _applicationService = applicationService;
        }

        public async Task<TokenResponseDto> RegisterAndGetTokenAsync(UserRegistrationDto dto)
        {
            await _registrationValidator.ValidateAndThrowAsync(dto);

            if (await _userRepository.FindByEmail(dto.Email) != null)
                throw new EntryExistsException($"User with Email {dto.Email} already exists.");

            var user = _mapper.Map<UserRegistrationDto, User>(dto);

            var hashedPassword = PasswordUtils.Hashify(dto.Password);
            user.HashedPassword = hashedPassword;

            await _userRepository.AddAsync(user);

            return new() { Token = _jwtService.GenerateToken(user) };
        }

        public async Task<TokenResponseDto> LoginAndGetTokenAsync(UserLoginDto dto)
        {
            var user = await _userRepository.FindByEmail(dto.Email);

            if (user == null)
                throw new InvalidAuthenticationDataException($"Invalid authentication data.");

            if (!PasswordUtils.Compare(dto.Password, user.HashedPassword))
                throw new InvalidAuthenticationDataException($"Invalid authentication data.");

            return new() { Token = _jwtService.GenerateToken(user) };
        }

        public async Task<UserDto> GetMappedAsync(Guid? id)
        {
            if (id == null)
                throw new BadRequestException("Id was null");

            var user = await GetFromDbAsync(id.Value);

            var dto = _mapper.Map<User, UserDto>(user);

            return dto;
        }

        public async Task<UserDto?> UpdateAndGetMappedAsync(Guid? id, UserUpdateDto dto)
        {
            if (id == null)
                throw new BadRequestException("Id was null");

            var user = await GetFromDbAsync(id.Value);

            await _updateValidator.ValidateAndThrowAsync(dto);

            _mapper.Map<UserUpdateDto, User>(dto, user);

            await _userRepository.UpdateAsync(user);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<List<UserDto>> GetUsersByGroupId(Guid id) 
        {
            return _mapper.Map<List<UserDto>>(await _userRepository.FindByGroupId(id));
        }

        public async Task<UserDto> AttachUserToGroupAsync(Group group, Guid userId) 
        {
            var user = await GetFromDbAsync(userId);

            user.GroupId = group.Id;

            await _userRepository.UpdateAsync(user);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<UserDto> DetatchUserFromGroupAsync(Guid userId) 
        {
            var user = await GetFromDbAsync(userId);

            user.GroupId = null;

            await _userRepository.UpdateAsync(user);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<Guid> ChangeUsersRoleAsync(Guid userId, Role role)
        {
            var user = await GetFromDbAsync(userId);

            user.Role = role;

            await _userRepository.UpdateAsync(user);

            return userId;

        }

        public async Task<List<UserDto>> Search(Guid? groupId, string? nameQuery)
        {
            return (await _userRepository.Search(groupId, nameQuery)).Select(_mapper.Map<User, UserDto>).ToList();
        }

        public async Task<List<StudentApplicationDto>> GetAllYoursApplication(Guid userId, DateTime? from, DateTime? to, bool onlyOnChecking) 
        {
            return await _applicationService.GetAllApplicationsMappedAsync(userId, from, to, onlyOnChecking);
        }

        internal async Task<User> GetFromDbAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return user;
        }

    }
}
