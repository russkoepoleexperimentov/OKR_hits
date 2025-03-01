namespace Application.Dtos
{

    public class GroupCreateUpdateDto
    {
        public Guid? ParentId {  get; set; } = null!;

        public string Name { get; set; } = null!;
    }

    public class GroupDto : BaseDto
    {
        public GroupDto? Parent { get; set; } = null!;

        public string Name { get; set; } = null!;
    }

}