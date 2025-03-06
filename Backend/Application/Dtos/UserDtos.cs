using Common.Enums;

namespace Application.Dtos
{
    public class UserLoginDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
    public class UserRegistrationDto : UserLoginDto
    {
        public string Credentials { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }

    public class UserDto : BaseDto
    {
        public Guid? GroupId { get; set; } = null!; 
        public string Credentials { get; set; } = null!;
        public Role Role { get; set; }
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }

    public class UserUpdateDto
    {
        public string Credentials { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }

    public class TokenResponseDto
    {
        public string Token { get; set; } = null!;
    }
}
