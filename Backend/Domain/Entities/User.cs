using Common.Enums;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public string Credentials { get; set; } = null!;
        public Role Role { get; set; }
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string HashedPassword { get; set; } = null!;
    }
}
