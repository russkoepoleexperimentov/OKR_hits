
namespace Domain.Entities
{
    public class Group : BaseEntity
    {
        public virtual Group? Parent { get; set; } = null!;  
        public string Name { get; set; } = null!;
    }
}
