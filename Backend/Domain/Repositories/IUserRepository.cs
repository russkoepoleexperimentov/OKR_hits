using Domain.Entities;

namespace Domain.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> FindByEmail(string email);

        Task<List<User>> FindByGroupId(Guid id);
    }
}
