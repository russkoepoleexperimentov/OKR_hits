using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await Set.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<List<User>> FindByGroupId(Guid id)
        {
            return await Set.Where(x => x.GroupId == id).ToListAsync();

        }

        public async Task<List<User>> Search(Guid? groupId, string? credentialsQuery = null)
        {
            credentialsQuery ??= string.Empty;
            credentialsQuery = credentialsQuery.ToUpper();

            var query = Set.Where(x => x.Credentials.ToUpper().Contains(credentialsQuery));

            if(groupId != null)
            {
                query = query.Where(x => x.GroupId == groupId);
            }

            return await query.ToListAsync();
        }
    }
}
