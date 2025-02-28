using Domain.Entities;

namespace Domain.Repositories
{
    public interface IGroupRepository : IBaseRepository<Group>
    {
        Task<Group?> FindByName(string name);

    }
}
