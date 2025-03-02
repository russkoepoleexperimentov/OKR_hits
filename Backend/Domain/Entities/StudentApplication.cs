
using Common.Enums;

namespace Domain.Entities
{
    public class StudentApplication : BaseEntity
    {
        public virtual User Author { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public StudentApplicationStatus Status { get; set; }
    }
}
