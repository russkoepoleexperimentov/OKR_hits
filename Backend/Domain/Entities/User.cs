using Common.Enums;
using System.Text.RegularExpressions;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public virtual Group? Group { get; set; } = null!; 
        public string Credentials { get; set; } = null!;
        public Role Role { get; set; }
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string HashedPassword { get; set; } = null!;
    }
}
