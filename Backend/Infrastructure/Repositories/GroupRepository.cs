using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GroupRepository : GenericRepository<Group>, IGroupRepository
    {
        public GroupRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<Group?> FindByName(string name)
        {
            return await Set.FirstOrDefaultAsync(x => x.Name == name);
        }

    }
}
