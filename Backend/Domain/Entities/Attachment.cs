
using Common.Enums;

namespace Domain.Entities
{
    public class Attachment : BaseEntity
    {
        public virtual StudentApplication Application { get; set; } = null!;
        public virtual User Author { get; set; } = null!;
        public string Path { get; set; } = null!;
        public string? ContentType { get; set; }
    }
}
